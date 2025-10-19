import { Route, Routes } from 'react-router-dom'
import Header from './components/header'
import HomePage from './pages/home'
import DetailsProduct from './pages/product/DetailsProduct'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { useCartStore } from './store/cartStore'
import { useCart } from './data/cart'
import CartPage from './pages/cart'
import CheckoutPage from './pages/checkout'
import OrdersPage from './pages/orders'
import OrderDetailPage from './pages/orders/OrderDetails'
import Footer from './components/Footer'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {
    const { setCart } = useCartStore((state) => state)
    const { data } = useCart()

    useEffect(() => {
        setCart(data)
    }, [data, setCart])

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Nội dung chính (Routes) */}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/category/:slug" element={<HomePage />} />
                    <Route path="/product/:productSlug" element={<DetailsProduct />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/order/:orderId" element={<OrderDetailPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>

            {/* Footer */}
            <Footer />

            {/* ToastContainer */}
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default App
