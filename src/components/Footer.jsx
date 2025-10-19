import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton, Typography } from '@mui/material'
import { MapPin, Phone, Mail, Twitter, Instagram, Facebook } from 'lucide-react'
import { memo } from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Grid layout cho footer */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Cột 1: Thông tin liên hệ */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên hệ với chúng tôi</h3>
                        <div className="flex gap-2 items-center mb-2">
                            <MapPin />
                            <Typography variant="body2">An Thượng - Hoài Đức - Hà Nội</Typography>
                        </div>
                        <div className="flex gap-2 items-center mb-2">
                            <Phone />
                            <Typography variant="body2">+84 123 456 789</Typography>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Mail />
                            <Typography variant="body2">support@cstore.com</Typography>
                        </div>
                    </div>

                    {/* Cột 2: Danh mục sản phẩm */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/ao-nam" className="hover:text-gray-300 transition-colors">
                                    Áo Nam
                                </Link>
                            </li>
                            <li>
                                <Link to="/do-handmade" className="hover:text-gray-300 transition-colors">
                                    Đồ Handmade
                                </Link>
                            </li>
                            <li>
                                <Link to="/thoi-trang" className="hover:text-gray-300 transition-colors">
                                    Thời Trang
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 3: Hỗ trợ */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Hỗ trợ</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/chinh-sach-doi-tra" className="hover:text-gray-300 transition-colors">
                                    Chính sách đổi trả
                                </Link>
                            </li>
                            <li>
                                <Link to="/chinh-sach-van-chuyen" className="hover:text-gray-300 transition-colors">
                                    Chính sách vận chuyển
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-gray-300 transition-colors">
                                    Câu hỏi thường gặp
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 4: Mạng xã hội & Thanh toán */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Kết nối với chúng tôi</h3>
                        <div className="flex space-x-4 mb-4">
                            <IconButton
                                href="https://facebook.com"
                                target="_blank"
                                className="text-white hover:text-gray-300"
                            >
                                <Facebook fill="#0866ff" />
                            </IconButton>
                            <IconButton
                                href="https://instagram.com"
                                target="_blank"
                                className="text-white hover:text-gray-300"
                            >
                                <Instagram fill="white" />
                            </IconButton>
                            <IconButton
                                href="https://twitter.com"
                                target="_blank"
                                className="text-white hover:text-gray-300"
                            >
                                <Twitter fill="#1c96e8" />
                            </IconButton>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Phương thức thanh toán</h3>
                        <div className="flex space-x-2">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                                alt="Visa"
                                className="h-6"
                            />
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                                alt="MasterCard"
                                className="h-6"
                            />
                        </div>
                    </div>
                </div>

                {/* Phần bản quyền */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} CSTORE. All rights reserved.
                    </Typography>
                </div>
            </div>
        </footer>
    )
}

export default memo(Footer)
