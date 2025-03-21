import React, { FC } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'
import Logo from './Logo'
import { X } from 'lucide-react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { Link, useLocation } from 'react-router-dom'
import { useCategories } from '../data/category'

const Sidebar = ({ isOpen, onClose }) => {
    const sidebarRef = useOutsideClick(onClose)

    const location = useLocation()
    const pathName = location.pathname

    const { data: categories = [] } = useCategories()

    return (
        <div
            className={`fixed inset-y-0 left-0 z-50 shadow-xl bg-black/50 hoverEffect w-full ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <motion.div
                ref={sidebarRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="min-w-72 max-w-96 text-white/90 h-full bg-black p-10 border-r border-r-white flex flex-col gap-6"
            >
                <div className="flex items-center justify-between">
                    <button onClick={onClose}>
                        <Logo className="text-white">CStore</Logo>
                    </button>
                    <button className="hover:text-red-500 hoverEffect" onClick={onClose}>
                        <X />
                    </button>
                </div>
                <div className="flex flex-col gap-3.5 text-base font-semibold tracking-wide">
                    {categories?.map((item) => (
                        <Link
                            key={item._id}
                            to={`/category/${item.slug}?category=${item._id}`}
                            className={`hover:text-white hoverEffect relative group ${
                                pathName === `/category/${item.slug}` && 'text-white'
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}

                    <div className="sm:hidden my-1 h-px bg-white" />

                    <div className="sm:hidden flex flex-col gap-3.5 text-base font-semibold tracking-wide">
                        <Link to="/orders" className={`hover:text-white hoverEffect relative group`}>
                            Đơn hàng đã mua
                        </Link>
                        <Link className={`hover:text-white hoverEffect relative group`}>Đăng xuất</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Sidebar
