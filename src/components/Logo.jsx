import { Link } from 'react-router-dom'
import { cn } from '../helpers/cn'

const Logo = ({ children, className }) => {
    return (
        <Link to="/">
            <h2 className={cn('text-2xl text-darkColor font-black tracking-wider uppercase', className)}>{children}</h2>
        </Link>
    )
}

export default Logo
