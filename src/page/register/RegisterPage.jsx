import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        phone: '',
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
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Đăng ký thành công');
                alert('Đăng ký thành công!');
                navigate('/login');
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('Đăng ký thất bại:', errorData);
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error);
            alert('Đã xảy ra lỗi khi kết nối đến server.');
        }
    };

    return (
        <div className="register-container">
            <main className="register-main">
                <div className="register-content-wrapper">
                    <div className="register-banner">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg"
                            alt="Shopee Banner"
                            className="login-banner-img"
                        />
                        <p>Nền Tảng thương mại điện tử hàng đầu Việt Nam</p>
                    </div>

                    <div className="register-form-container">
                        <form className="register-form" onSubmit={handleSubmit}>
                            <h2>Đăng ký</h2>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="fullname"
                                    placeholder="Họ và tên"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Tên đăng nhập"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Số điện thoại"
                                    value={formData.phone}
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

                            <button type="submit" className="register-btn">ĐĂNG KÝ</button>

                            <div className="register-footer">
                                <span>Bằng việc đăng kí, bạn đã đồng ý với Shopee về</span>
                                <br />
                                <a href="/terms">Điều khoản dịch vụ</a> & <a href="/privacy">Chính sách bảo mật</a>
                            </div>

                            <div className="register-login-link">
                                Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RegisterPage;
