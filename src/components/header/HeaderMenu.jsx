import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCategories } from '../../data/category'

const HeaderMenu = () => {
    const location = useLocation()
    const pathName = location.pathname
    const { data: categories } = useCategories()

    return (
        <div className="hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold">
            <Link
                to="/"
                className={`hover:text-black text-base hoverEffect relative group ${pathName === '/' && 'text-black'}`}
            >
                <span
                    className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:left-0 ${
                        pathName === '/' && 'w-1/2'
                    }`}
                />
                <span
                    className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:right-0 ${
                        pathName === '/' && 'w-1/2'
                    }`}
                />
                Home
            </Link>
            {categories?.map((item) => (
                <Link
                    key={item._id}
                    to={`/category/${item.slug}?category=${item._id}`}
                    className={`hover:text-black text-base hoverEffect relative group ${
                        pathName === `/category/${item.slug}` && 'text-black'
                    }`}
                >
                    {item.name}
                    <span
                        className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:left-0 ${
                            pathName === `/category/${item.slug}` && 'w-1/2'
                        }`}
                    />
                    <span
                        className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:right-0 ${
                            pathName === `/category/${item.slug}` && 'w-1/2'
                        }`}
                    />
                </Link>
            ))}
        </div>
    )
}

export default HeaderMenu
