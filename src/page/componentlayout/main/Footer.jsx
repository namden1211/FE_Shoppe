import React from 'react';
import './Header.css';
const Footer = () => {
    return (
        <footer className="shopee-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>CHĂM SÓC KHÁCH HÀNG</h3>
                    <ul>
                        <li>Trung Tâm Trợ Giúp</li>
                        <li>Shopee Blog</li>
                        <li>Shopee Mall</li>
                        <li>Hướng Dẫn Mua Hàng</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>VỀ SHOPEE</h3>
                    <ul>
                        <li>Giới Thiệu Về Shopee Việt Nam</li>
                        <li>Tuyển Dụng</li>
                        <li>Điều Khoản Shopee</li>
                        <li>Chính Sách Bảo Mật</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>THANH TOÁN</h3>
                    <div className="payment-methods">
                        <span>Visa</span> <span>Mastercard</span> <span>JCB</span>
                    </div>
                </div>
                <div className="footer-section">
                    <h3>THEO DÕI CHÚNG TÔI TRÊN</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>LinkedIn</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2026 Shopee. Tất cả các quyền được bảo lưu.</p>
            </div>
        </footer>
    );
};
export default Footer;