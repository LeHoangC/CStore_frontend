import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCategories } from '../../data/category'
import { Menu, Transition } from '@headlessui/react' // Import Headless UI components
import { ChevronDown } from 'lucide-react' // Icon cho dropdown

const HeaderMenu = () => {
    const location = useLocation()
    const pathName = location.pathname
    const { data: categories } = useCategories()

    // Chia danh mục thành 2 phần: 3 danh mục đầu tiên và phần còn lại
    const displayedCategories = categories?.slice(0, 3) || [] // 3 danh mục đầu tiên
    const dropdownCategories = categories?.slice(3) || [] // Các danh mục còn lại

    return (
        <div className="hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold">
            {/* Link Home */}
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

            {/* Hiển thị 3 danh mục đầu tiên */}
            {displayedCategories.map((item) => (
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

            {/* Dropdown cho các danh mục còn lại */}
            {dropdownCategories.length > 0 && (
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="hover:text-black text-base hoverEffect relative group flex items-center gap-1">
                            Danh mục khác
                            <ChevronDown size={16} className="mt-0.5" />
                            <span
                                className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:left-0`}
                            />
                            <span
                                className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:right-0`}
                            />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                            <div className="py-1">
                                {dropdownCategories.map((item) => (
                                    <Menu.Item key={item._id}>
                                        {({ active }) => (
                                            <Link
                                                to={`/category/${item.slug}?category=${item._id}`}
                                                className={`${
                                                    active ? 'bg-gray-100 text-black' : 'text-gray-700'
                                                } block px-4 py-2 text-sm capitalize font-semibold`}
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            )}
        </div>
    )
}

export default HeaderMenu
