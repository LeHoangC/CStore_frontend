import React from 'react'
import Container from '../../components/Container'
import { useOrder } from '../../data/order'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { FormatPrice } from '../../utils/use-price'
import Logo from '../../components/Logo'
import { statusOrder } from '../../constants/orderStatus'
import { useState } from 'react'
import { Button } from '@mui/material'
import ReviewForm from '../../components/ui/ReviewForm'

moment.locale('vi')

const OrderDetails = () => {
    const { orderId } = useParams()
    const { data: order } = useOrder(orderId)

    const [reviewFormData, setReviewFormData] = useState({
        isOpen: false,
        productId: null,
        variantId: null,
        variantName: null,
    })

    const openReviewForm = (productId, variantId = null, variantName = null) => {
        setReviewFormData({
            isOpen: true,
            productId,
            variantId,
            variantName,
        })
    }

    const closeReviewForm = () => {
        setReviewFormData({
            isOpen: false,
            productId: null,
            variantId: null,
        })
    }

    return (
        <div>
            <Container className="py-10">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                    <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-11">
                        Đơn hàng của bạn {statusOrder[order?.order_status]?.title}
                    </h2>
                    <h6 className="font-medium text-xl leading-8 text-black mb-3">
                        Xin chào, {order?.order_user.user_name}
                    </h6>
                    {order?.order_status !== 'pending' && order?.order_status !== 'delivered' && (
                        <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
                            Đơn hàng của bạn đã hoàn tất và sẽ sớm được giao đến bạn.
                        </p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 py-6 border-y border-gray-100 mb-6">
                        <div className="box group">
                            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                                Đơn hàng
                            </p>
                            <h6 className="font-semibold font-manrope text-xl leading-9 text-black">
                                {order?.order_trackingNumber}
                            </h6>
                        </div>
                        <div className="box group">
                            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                                Ngày đặt hàng
                            </p>
                            <h6 className="font-semibold font-manrope text-xl leading-9 text-black">
                                {moment(order?.createdAt).format('HH:mm DD/MM/YYYY')}
                            </h6>
                        </div>
                        <div className="box group">
                            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                                Phương thức thanh toán
                            </p>
                            <h6 className="font-semibold font-manrope text-xl leading-9 text-black">
                                {order?.order_payment?.paymentMethod ?? ''}
                            </h6>
                        </div>
                        <div className="box group">
                            <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                                Địa chỉ
                            </p>
                            <h6 className="font-semibold font-manrope text-xl leading-9 text-black">
                                {order?.order_shipping?.address ?? ''}
                            </h6>
                        </div>
                    </div>

                    {/* Danh sách sản phẩm */}
                    {order?.order_product.map(({ product, quantity }) => (
                        <div key={product._id} className="grid grid-cols-7 w-full pb-6 border-b border-gray-100">
                            <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                                <img
                                    src={
                                        product.hasVariants ? product.variants[0].images[0].url : product.mainImage.url
                                    }
                                    alt={product.name}
                                    className="w-full rounded-xl object-cover"
                                />
                            </div>
                            <div className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
                                <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
                                    <div className="">
                                        <h5 className="font-manrope font-semibold text-xl leading-9 text-black mb-6 pr-10">
                                            {product.name}
                                        </h5>
                                        <p className="font-normal text-xl leading-8 text-gray-500">
                                            Số lượng: <span className="text-black font-semibold">{quantity}</span>
                                        </p>
                                        {product.hasVariants && (
                                            <p className="font-normal text-lg leading-8 text-gray-500 mt-2">
                                                Biến thể:{' '}
                                                {product.variants[0].combination
                                                    .map((c) => `${c.option}: ${c.value}`)
                                                    .join(', ')}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-end">
                                        {FormatPrice({
                                            amount:
                                                (product.hasVariants ? product.variants[0].price : product.price) *
                                                quantity,
                                            className: 'font-manrope font-semibold text-2xl leading-10 text-black mt-3',
                                        })}
                                    </div>
                                </div>
                                {/* Nút đánh giá nằm ở cuối */}
                                {order?.order_status === 'delivered' && (
                                    <div className="mt-4 flex justify-end">
                                        <Button
                                            variant="contained"
                                            size="small" // Làm nút nhỏ gọn
                                            onClick={() =>
                                                openReviewForm(
                                                    product._id,
                                                    product.hasVariants ? product.variants[0]._id : null,
                                                    product.hasVariants &&
                                                        product.variants[0].combination
                                                            .map((c) => `${c.option}: ${c.value}`)
                                                            .join(', ')
                                                )
                                            }
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1 px-3 rounded-lg text-sm"
                                        >
                                            Viết đánh giá
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Tổng kết đơn hàng */}
                    <div className="flex items-center justify-center sm:justify-end w-full my-6">
                        <div className="w-full">
                            <div className="flex items-center justify-between mb-6">
                                <p className="font-normal text-xl leading-8 text-gray-500">Tổng tiền hàng</p>
                                {FormatPrice({
                                    amount: order?.order_checkout.totalPrice,
                                    className: 'font-semibold text-xl leading-8 text-gray-900',
                                })}
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <p className="font-normal text-xl leading-8 text-gray-500">Phí vận chuyển</p>
                                {FormatPrice({
                                    amount: order?.order_checkout.feeShip,
                                    className: 'font-semibold text-xl leading-8 text-gray-900',
                                })}
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <p className="font-normal text-xl leading-8 text-gray-500">Giảm giá</p>
                                {FormatPrice({
                                    amount: order?.order_checkout.discount,
                                    className: 'font-semibold text-xl leading-8 text-gray-900',
                                })}
                            </div>
                            <div className="flex items-center justify-between py-6 border-y border-gray-100">
                                <p className="font-manrope font-semibold text-2xl leading-9 text-gray-900">Tổng cộng</p>
                                {FormatPrice({
                                    amount: order?.order_checkout.totalCheckout,
                                    className: 'font-manrope font-bold text-2xl leading-9 text-indigo-600',
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="data">
                        {order?.order_status !== 'delivered' && (
                            <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
                                Chúng tôi sẽ gửi email xác nhận giao hàng khi hàng đã được giao thành công.
                            </p>
                        )}
                        <h6 className="font-manrope font-bold text-2xl leading-9 text-black mb-3">
                            Cảm ơn bạn đã mua sắm cùng chúng tôi!
                        </h6>
                        <Logo className="font-medium text-xl leading-8 text-indigo-600">CStore</Logo>
                    </div>
                </div>
            </Container>

            <ReviewForm
                orderId={orderId}
                productId={reviewFormData.productId}
                variantId={reviewFormData.variantId}
                variantName={reviewFormData.variantName}
                isOpen={reviewFormData.isOpen}
                onClose={closeReviewForm}
            />
        </div>
    )
}

export default OrderDetails
