// src/pages/Checkout.js
import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Checkbox } from '@mui/material'
import Container from '../../components/Container'
import { ChevronDown } from 'lucide-react'
import { useCheckoutReviewMutation } from '../../data/checkout'
import { useEffect } from 'react'
import { useCartStore } from '../../store/cartStore'
import { FormatPrice } from '../../utils/use-price'
import { Link } from 'react-router-dom'
import { useCreateOrderMutation } from '../../data/order'
import { LoaderCircle } from 'lucide-react'

const CheckoutPage = () => {
    const itemCheckout = JSON.parse(localStorage.getItem('itemCheckout')) || []
    // State cho các input của form
    const [billingType, setBillingType] = useState('individual')

    const [productsChekout, setProductsCheckout] = useState([])
    const [checkoutOrder, setCheckoutOrder] = useState({})
    const { cartItems } = useCartStore()

    const [paymentMethod, setPaymentMethod] = useState('Ngân hàng')
    const [address, setAdress] = useState('')
    const [payloadOrder, setPayloadOrder] = useState({
        cartId: cartItems?._id,
        orderProducts: itemCheckout,
        userPayment: { paymentMethod },
        userAddress: { address },
    })

    useEffect(() => {
        setPayloadOrder((prev) => ({
            ...prev,
            userPayment: { paymentMethod },
            userAddress: { address },
        }))
    }, [paymentMethod, address])

    const { mutateAsync: checkoutReview } = useCheckoutReviewMutation()

    useEffect(() => {
        const fetchCheckoutReview = async () => {
            try {
                const { products, checkoutOrder } = await checkoutReview({
                    cartId: cartItems?._id,
                    products: itemCheckout,
                })
                setCheckoutOrder(checkoutOrder)
                const dataProductReview = products.map(({ product, quantity }) => ({
                    name: product.name,
                    quantity,
                    price: product.hasVariants ? product?.variants?.[0].price : product.price,
                }))
                setProductsCheckout(dataProductReview)
            } catch (error) {
                console.error('Error during checkout review:', error)
            }
        }

        cartItems && fetchCheckoutReview()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkoutReview, cartItems])

    const { mutate: createOrder, isPending } = useCreateOrderMutation()

    const handleCreateOrder = () => {
        createOrder(payloadOrder)
    }

    return (
        <Container>
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Cột bên trái: Form thông tin */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Địa chỉ thanh toán */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Địa chỉ thanh toán</h2>
                        <div className="flex space-x-4 mb-4">
                            <FormControl component="fieldset">
                                <RadioGroup row value={billingType} onChange={(e) => setBillingType(e.target.value)}>
                                    <FormControlLabel value="individual" control={<Radio />} label="Cá nhân" />
                                    <FormControlLabel value="company" control={<Radio />} label="Công ty" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="mb-4">
                            <Listbox>
                                <Listbox.Button className="w-full p-2 border rounded flex justify-between items-center">
                                    <span>Chọn một trong các địa chỉ đã lưu</span>
                                    <ChevronDown />
                                </Listbox.Button>
                            </Listbox>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <TextField label="Tên" variant="outlined" fullWidth required />
                            <TextField label="Họ" variant="outlined" fullWidth required />
                        </div>
                        <div className="mb-4">
                            <TextField label="Số điện thoại" variant="outlined" fullWidth required />
                        </div>
                        <div className="mb-4">
                            <TextField
                                label="Địa chỉ giao hàng"
                                variant="outlined"
                                fullWidth
                                required
                                multiline
                                rows={2}
                                onChange={(e) => setAdress(e.target.value)}
                            />
                        </div>
                        <div>
                            <FormControlLabel control={<Checkbox />} label="Lưu dữ liệu vào danh sách địa chỉ" />
                        </div>
                    </div>

                    {/* Chi tiết thanh toán */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Chi tiết thanh toán</h2>
                        <FormControl component="fieldset">
                            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                <FormControlLabel
                                    value="Ngân hàng"
                                    control={<Radio />}
                                    label="Thanh toán bằng thẻ ngân hàng"
                                />
                                <FormControlLabel
                                    value="Thanh toán khi nhận hàng"
                                    control={<Radio />}
                                    label="Thanh toán khi nhận hàng"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>

                {/* Cột bên phải: Tóm tắt đơn hàng */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow sticky top-6">
                        <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
                        {productsChekout?.map((item, index) => (
                            <div key={index} className="flex gap-4 justify-between mb-4">
                                <div className="flex-1">
                                    <p className="text-sm md:text-base">{item.name}</p>
                                    <p className="text-sm md:text-base text-gray-500">x{item.quantity}</p>
                                </div>
                                <p className="font-semibold">{FormatPrice({ amount: item.price * item.quantity })}</p>
                            </div>
                        ))}
                        <hr className="my-4" />
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <p>Giá gốc</p>
                                <p>{FormatPrice({ amount: checkoutOrder.totalCheckout })}</p>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <p>Giảm giá</p>
                                <p>-{FormatPrice({ amount: checkoutOrder.discount })}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Vận chuyển</p>
                                <p>{FormatPrice({ amount: checkoutOrder.feeShip })}</p>
                            </div>

                            <div className="flex justify-between font-bold text-lg">
                                <p>Tổng cộng</p>
                                <p>{FormatPrice({ amount: checkoutOrder.totalPrice })}</p>
                            </div>
                        </div>
                        <button
                            className="cursor-pointer w-full flex items-center justify-center gap-4 bg-blue-600 text-white py-3 rounded-lg mt-4"
                            onClick={handleCreateOrder}
                        >
                            {isPending && <LoaderCircle className="animate-spin" />}
                            <p>Đặt hàng</p>
                        </button>
                        <button className="cursor-pointer w-full text-blue-600 py-3 mt-2">
                            <Link to={'/'}>hoặc Quay lại mua sắm →</Link>
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default CheckoutPage
