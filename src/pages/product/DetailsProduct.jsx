import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProduct } from '../../data/product'
import Container from '../../components/Container'
import ImageView from '../../components/ImageView'
import { Button, Rating } from '@mui/material'
import { FormatPrice, FormatPriceVariant } from '../../utils/use-price'
import { useAddToCartMutation } from '../../data/cart'
import { ShoppingCart, Heart } from 'lucide-react'

const DetailsProduct = () => {
    const { productSlug } = useParams()
    const { data: product = {}, isLoading } = useProduct(productSlug)

    const {
        _id,
        mainImage = {},
        images = [],
        name,
        ratings = {},
        hasVariants,
        price,
        variantOptions,
        variants,
        description,
        stock,
    } = product

    const [quantity, setQuantity] = useState(1)
    const [selectedOptions, setSelectedOptions] = useState({})
    const [activeImage, setActiveImage] = useState(null) // Khởi tạo null để kiểm soát lần đầu
    const [isUserSelectedImage, setIsUserSelectedImage] = useState(false) // Flag để kiểm tra người dùng chọn ảnh

    // Tìm variant phù hợp dựa trên selectedOptions
    const findMatchingVariant = useCallback(() => {
        return variants?.find((variant) =>
            variant.combination.every((item) => selectedOptions[item.option] === item.value)
        )
    }, [selectedOptions, variants])

    const selectedVariant = useMemo(() => findMatchingVariant(), [findMatchingVariant])

    // Cập nhật payloadItem dựa trên quantity và selectedVariant
    const payloadItem = useMemo(
        () => ({ quantity, productId: _id, variantId: selectedVariant?._id }),
        [quantity, _id, selectedVariant]
    )

    // Xử lý activeImage khi dữ liệu tải lần đầu hoặc variant thay đổi
    useEffect(() => {
        if (isLoading) return

        // Chỉ cập nhật nếu người dùng chưa chọn ảnh thủ công
        if (!isUserSelectedImage) {
            const newImage = selectedVariant?.images?.[0] || mainImage
            if (newImage?.url && activeImage?.url !== newImage.url) {
                setActiveImage(newImage)
            }
        }
    }, [isLoading, mainImage, selectedVariant, isUserSelectedImage, activeImage])

    // Hàm xử lý khi người dùng chọn ảnh từ ImageView
    const handleImageSelect = (image) => {
        setActiveImage(image)
        setIsUserSelectedImage(true) // Đánh dấu rằng người dùng đã chọn ảnh
    }

    const { mutate: handleAddToCart } = useAddToCartMutation()

    const handleSelectOption = (optionName, value) => {
        setSelectedOptions((prev) => ({ ...prev, [optionName]: value }))
        setIsUserSelectedImage(false) // Reset flag khi chọn variant mới
    }

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1)
    }

    const handleIncrease = () => {
        setQuantity(quantity + 1)
    }

    const handleInputChange = (e) => {
        const value = e.target.value
        if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 1)) {
            setQuantity(value === '' ? '' : parseInt(value))
        }
    }

    const handleBlur = () => {
        if (quantity === '' || quantity < 1) setQuantity(1)
    }

    if (isLoading) {
        return <Container>Loading...</Container>
    }

    return (
        <Container className="">
            <div className="py-10 flex flex-col md:flex-row gap-10">
                <ImageView
                    images={images}
                    activeImage={activeImage}
                    setActiveImage={handleImageSelect} // Sử dụng hàm mới
                />
                <div className="w-full md:w-1/2 flex flex-col gap-5">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">{name}</h2>
                        <p className="flex items-center">
                            {ratings && (
                                <Rating
                                    name="half-rating-read"
                                    defaultValue={ratings.average}
                                    precision={0.5}
                                    readOnly
                                />
                            )}
                            <span className="ml-2">({ratings.count})</span>
                        </p>
                        {!hasVariants
                            ? FormatPrice({ amount: price, className: 'md:text-2xl' })
                            : selectedVariant
                            ? FormatPrice({ amount: selectedVariant?.price, className: 'md:text-2xl' })
                            : FormatPriceVariant({ variants: variants, className: 'md:text-2xl' })}
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                    <div>
                        {variantOptions?.map((option) => (
                            <div key={option._id} className="mb-2">
                                <h4>{option.option}</h4>
                                <div className="space-x-2 space-y-2">
                                    {option.values.map((val) => (
                                        <button
                                            key={val}
                                            className={`py-1 px-2 border rounded-sm ${
                                                selectedOptions[option.option] === val
                                                    ? 'border-blue-500'
                                                    : 'border-gray-200'
                                            }`}
                                            onClick={() => handleSelectOption(option.option, val)}
                                        >
                                            {val}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="text-gray-600 font-medium md:text-lg">Số Lượng</span>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                                onClick={handleDecrease}
                                disabled={hasVariants && !selectedVariant}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer"
                            >
                                -
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                disabled={hasVariants && !selectedVariant}
                                className="w-12 text-center py-1 text-blue-500 font-semibold bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                                onClick={handleIncrease}
                                disabled={hasVariants && !selectedVariant}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                        <span className="text-gray-600 font-medium text-base">
                            {hasVariants ? selectedVariant && `${selectedVariant?.stock} có sẵn` : `${stock} có sẵn`}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outlined"
                            className="w-fit"
                            size={window.innerWidth < 640 ? 'small' : 'large'}
                            startIcon={<ShoppingCart size={22} />}
                            disabled={hasVariants && !selectedVariant}
                            onClick={() => handleAddToCart(payloadItem)}
                        >
                            Thêm vào giỏ hàng
                        </Button>
                        <Heart stroke="red" strokeOpacity={0.7} className="cursor-pointer" />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default DetailsProduct
