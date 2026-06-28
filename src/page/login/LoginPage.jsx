import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Đăng nhập thành công');
                const data = await response.json();
                localStorage.setItem('token', data.token);
                alert('Đăng nhập thành công!');
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('Đăng nhập thất bại:', errorData);
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            alert('Đã xảy ra lỗi khi kết nối đến server.');
        }
    };

    return (
        <div className="login-container">
            <main className="login-main">
                <div className="login-content-wrapper">
                    <div className="login-banner">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg"
                            alt="Shopee Banner"
                            className="login-banner-img"
                        />
                        <p>Nền Tảng thương mại điện tử hàng đầu Việt Nam</p>
                    </div>
                    <div className="login-form-container">
                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="login-form-header">
                                <h2>Đăng nhập</h2>
                                <div className="login-qr-login">
                                    <span>Đăng nhập với mã QR</span>
                                    <svg width="24" height="24" viewBox="0 0 40 40" className="qr-icon">
                                        <path d="M12.5 16.5h-5v-5h5v5zm11 0h-5v-5h5v5zm11 0h-5v-5h5v5zm-22 11h-5v-5h5v5zm11 0h-5v-5h5v5zm11 0h-5v-5h5v5zm-22 11h-5v-5h5v5zm11 0h-5v-5h5v5zm11 0h-5v-5h5v5z" fill="#ee4d2d" />
                                    </svg>
                                </div>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Email/Số điện thoại/Tên đăng nhập"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Mật khẩu"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="login-btn">ĐĂNG NHẬP</button>

                            <div className="login-options">
                                <a href="/forgot-password">Quên mật khẩu</a>
                                <a href="/login-sms">Đăng nhập với SMS</a>
                            </div>

                            <div className="login-divider">
                                <div className="divider-line"></div>
                                <span className="divider-text">HOẶC</span>
                                <div className="divider-line"></div>
                            </div>

                            <div className="social-login">
                                <button type="button" className="social-btn facebook">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
                                    Facebook
                                </button>
                                <button type="button" className="social-btn google">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
                                    Google
                                </button>
                            </div>

                            <div className="login-register-link">
                                Bạn mới biết đến Shopee? <a href="/register">Đăng ký</a>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
