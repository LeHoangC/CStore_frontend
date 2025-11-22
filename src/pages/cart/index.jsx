import React from 'react'
import { FormatPrice, FormatPriceVariant } from '../../utils/use-price'
import Container from '../../components/Container'
import { useCartStore } from '../../store/cartStore'
import { useAddToCartMutation, useRemoveItemMutation } from '../../data/cart'
import EmptyCart from '../../assets/empty-cart.png'
import { Button } from '@mui/material'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'

const CartPage = () => {
    const { cartItems: { cart_products = [] } = {} } = useCartStore()

    const { mutate: handleAddToCart } = useAddToCartMutation()
    const { mutate: removeItemCart } = useRemoveItemMutation()

    const handleDecrease = (product, quantity) => {
        const payload = {
            productId: product._id,
            quantity: -1,
            variantId: product.hasVariants ? product.variants[0]._id : null,
        }

        if (quantity <= 1) {
            delete payload.quantity
            handleRemoveItemCart(payload)
        } else {
            handleAddToCart(payload)
        }
    }

    const handleIncrease = (product, quantity) => {
        const currentStock = product.hasVariants ? product.variants[0]?.stock : product.stock

        if (quantity >= currentStock) {
            return toast.error(`Số lượng tồn kho của sản phẩm ${product.name} chỉ còn lại ${currentStock}`)
        }

        const payload = {
            productId: product._id,
            quantity: 1,
            variantId: product.hasVariants ? product.variants[0]._id : null,
        }
        handleAddToCart(payload)
    }

    const handleRemoveItemCart = (payload) => {
        removeItemCart(payload)
    }

    const [selectedProducts, setSelectedProducts] = useState([])

    const handleSelectProduct = (product, quantity) => {
        const productData = {
            productId: product._id,
            name: product.name,
            quantity,
            price: product.hasVariants ? product.variants[0].price : product.price,
        }
        if (product.hasVariants) {
            productData.variantId = product.variants[0]._id
        }
        const productKey = `${product._id}_${productData.variantId || ''}`

        setSelectedProducts((prev) => {
            const isSelected = prev.some((item) => `${item.productId}_${item.variantId || ''}` === productKey)
            if (isSelected) {
                return prev.filter((item) => `${item.productId}_${item.variantId || ''}` !== productKey)
            } else {
                return [...prev, productData]
            }
        })
    }

    const totalPrice = useMemo(() => {
        return selectedProducts?.reduce((total, { price, quantity }) => total + price * quantity, 0)
    }, [selectedProducts])

    return (
        <Container>
            {!cart_products?.length ? (
                <div className="mt-20 w-full flex flex-col justify-center items-center">
                    <p className="text-2xl font-bold">Giỏ hàng của bạn chưa có sản phẩm nào</p>
                    <img src={EmptyCart} alt="EmptyCart" className="w-[30%]" />
                </div>
            ) : (
                <div>
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Chọn
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Sản phẩm
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Phân loại
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Đơn giá
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Số lượng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Số tiền
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {cart_products?.map(({ product, quantity }) => {
                                const productKey = `${product._id}_${
                                    product.hasVariants ? product.variants[0]._id : ''
                                }`
                                const isSelected = selectedProducts.some(
                                    (item) => `${item.productId}_${item.variantId || ''}` === productKey
                                )
                                return (
                                    <tr
                                        key={productKey}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleSelectProduct(product, quantity)}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2 items-center tracking-wider max-w-sm overflow-hidden overflow-ellipsis">
                                            <img
                                                src={
                                                    product.hasVariants
                                                        ? product.variants[0].images[0].url
                                                        : product?.mainImage
                                                        ? product.mainImage.url
                                                        : 'https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww'
                                                }
                                                alt="Product img"
                                                className="size-10 rounded-full object-cover"
                                            />
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {product.hasVariants ? product.variants[0].classify : ''}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {FormatPrice({
                                                amount: product.hasVariants ? product.variants[0].price : product.price,
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center border border-gray-300 rounded-md max-w-[74px]">
                                                <button
                                                    onClick={() => handleDecrease(product, quantity)}
                                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer"
                                                >
                                                    -
                                                </button>
                                                <span className="px-2">{quantity}</span>
                                                <button
                                                    onClick={() => handleIncrease(product, quantity)}
                                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {FormatPrice({
                                                amount:
                                                    (product.hasVariants ? product.variants[0].price : product.price) *
                                                    quantity,
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Button
                                                variant="contained"
                                                onClick={() =>
                                                    handleRemoveItemCart({
                                                        productId: product._id,
                                                        variantId: product.hasVariants ? product.variants[0]._id : null,
                                                    })
                                                }
                                            >
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="mt-8 flex justify-end">
                        <div className="w-full max-w-sm  p-6 rounded-lg">
                            <h2 className="text-xl font-bold mb-4">Thông tin thanh toán</h2>
                            <div className="flex justify-between mb-2">
                                <span>Tổng tiền hàng:</span>
                                <span>{FormatPrice({ amount: totalPrice })}</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span>Phí vận chuyển:</span>
                                <span>Miễn phí</span>
                            </div>
                            <div className="my-4 flex justify-between font-bold text-lg border-t pt-2">
                                <span>Tổng thanh toán:</span>
                                <span>{FormatPrice({ amount: totalPrice })}</span>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={!selectedProducts.length}
                                onClick={() => {
                                    localStorage.setItem('itemCheckout', JSON.stringify(selectedProducts))
                                }}
                            >
                                <Link to={'/checkout'}>Tiến hành thanh toán</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    )
}

export default CartPage
