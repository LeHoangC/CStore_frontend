import { useEffect, useMemo, useRef, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Container from '../Container'
import HeaderMenu from './HeaderMenu'
import Logo from '../Logo'
import MobileMenu from '../MobileMenu'
import CartIcon from '../CartIcon'
import { LogOut, User, ShoppingCart, Search } from 'lucide-react'
import { useLogoutMutation } from '../../data/authentication'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import debounce from 'lodash/debounce'
import { useAuthStore } from '../../store/authStore'

const Header = () => {
    const [isInputVisible, setIsInputVisible] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const inputRef = useRef(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const { user } = useAuthStore()

    const { mutate: handleLogout } = useLogoutMutation()

    const debouncedSearch = useMemo(
        () =>
            debounce((value) => {
                const currentParams = Object.fromEntries([...searchParams])
                if (value) {
                    setSearchParams({ ...currentParams, search: value })
                } else {
                    // eslint-disable-next-line no-unused-vars
                    const { search, ...rest } = currentParams
                    setSearchParams(rest)
                }
            }, 700),
        [searchParams, setSearchParams]
    )
    useEffect(() => {
        if (isInputVisible && inputRef.current) {
            inputRef.current.focus()
        }

        if (!isInputVisible) {
            setSearchValue('')
        }
    }, [isInputVisible])

    return (
        <header className="bg-white border-b border-b-gray-400 py-5 sticky top-0 z-10">
            <Container className="flex items-center justify-between gap-7">
                <HeaderMenu />
                <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
                    <MobileMenu />
                    <Logo>CStore</Logo>
                </div>
                <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
                    <div className="relative flex items-center">
                        {/* Ô Input với hiệu ứng */}
                        {isInputVisible && (
                            <motion.input
                                ref={inputRef}
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="border rounded-lg py-1.5 pl-3 mr-2"
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value)
                                    debouncedSearch(e.target.value)
                                }}
                                initial={{ x: 0, opacity: 0 }}
                                animate={{ x: -50, opacity: 1 }} // Di chuyển sang trái của icon tìm kiếm
                                transition={{ duration: 0.3 }}
                            />
                        )}
                        <div className="cursor-pointer" onClick={() => setIsInputVisible(!isInputVisible)}>
                            <Search />
                        </div>
                    </div>

                    {/* Icon Giỏ hàng */}
                    <div className="ml-4">
                        <CartIcon />
                    </div>
                    {user && (
                        <div className="hidden sm:block mt-1">
                            <Menu>
                                <MenuButton>
                                    <User className="w-7 h-7" />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    anchor="bottom end"
                                    className="z-20 w-52 mt-2 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                >
                                    <MenuItem>
                                        <Link
                                            to="/orders"
                                            className="group cursor-pointer flex w-full items-center rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                        >
                                            Đơn hàng đã mua
                                            <kbd className="ml-auto hidden font-sans text-xs text-white group-data-[focus]:inline">
                                                <ShoppingCart size={16} />
                                            </kbd>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            className="group cursor-pointer flex w-full items-center rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                            <kbd className="ml-auto hidden font-sans text-xs text-white group-data-[focus]:inline">
                                                <LogOut size={16} />
                                            </kbd>
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    )}
                </div>
            </Container>
        </header>
    )
}

export default Header
