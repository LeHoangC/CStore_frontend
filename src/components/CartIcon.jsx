import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

const CartIcon = () => {
    const cartItems = useCartStore((state) => state.cartItems)
    return (
        <Link to="/cart" className="group relative">
            <ShoppingBag className="w-6 h-6 group-hover:text-black hoverEffect" />
            <span className="absolute -top-1 -right-1 bg-black text-white h-4 w-4 rounded-full text-xs font-semibold flex items-center justify-center">
                {cartItems?.cart_count_product ?? 0}
            </span>
        </Link>
    )
}

export default CartIcon
