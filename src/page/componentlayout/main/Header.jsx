import React from 'react';
import './Header.css';
const Header = () => {
    return (
        <header className="shopee-header">
            <div className="header-top">
                <div className="header-links left">
                    <span>Kênh Người Bán</span>
                    <span>Trở thành Người bán Shopee</span>
                    <span>Tải ứng dụng</span>
                    <span>Kết nối</span>
                </div>
                <div className="header-links right">
                    <span>Thông báo</span>
                    <span>Hỗ trợ</span>
                    <span>Tiếng Việt</span>
                    <span>Đăng Ký</span>
                    <span>Đăng Nhập</span>
                </div>
            </div>
            <div className="header-main">
                <div className="logo">
                    <div>Shopee</div>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Shopee bao ship 0Đ - Đăng ký ngay!" />
                    <button>
                        <svg height="19" viewBox="0 0 19 19" width="19" className="search-icon">
                            <g fillRule="evenodd" stroke="none" strokeWidth="1">
                                <g transform="translate(-1016 -32)">
                                    <g>
                                        <g transform="translate(405 21)">
                                            <g transform="translate(611 11)">
                                                <path d="m14.953 14.071 3.586 3.587-1.18 1.18-3.586-3.587a7.227 7.227 0 1 1 1.18-1.18zm-5.726 1.679a5.958 5.958 0 1 0 0-11.916 5.958 5.958 0 0 0 0 11.916z" fill="#fff" fillRule="nonzero"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
                <div className="cart-icon">
                    <svg viewBox="0 0 26.6 25.6" className="shopee-svg-icon icon-shopping-cart-2">
                        <polyline fill="none" points="2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" stroke="#fff"></polyline>
                        <circle cx="10.7" cy="23" r="2.2" stroke="none" fill="#fff"></circle>
                        <circle cx="19.7" cy="23" r="2.2" stroke="none" fill="#fff"></circle>
                    </svg>
                </div>
            </div>
        </header>
    );
};

export default Header;