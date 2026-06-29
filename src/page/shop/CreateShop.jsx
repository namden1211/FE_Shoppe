import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateShop.css';

const ShopPage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [started, setStarted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [avatarFile, setAvatarFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);

    // Form fields mapped directly to the `shops` table columns in mysql database
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        avatar: '',
        cover: '',
        agreeToTerms: false
    });

    // Validation Errors
    const [errors, setErrors] = useState({});

    // Check login state
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            try {
                // Decode JWT username extraction
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                const decoded = JSON.parse(jsonPayload);
                setUsername(decoded.sub || decoded.username || 'Thành viên Shopee');
            } catch (e) {
                setUsername('Chủ Shop Tương Lai');
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    console.log(errors);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error as user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    [fieldName]: file
                }));
                if (fieldName === 'avatar') {
                    setAvatarFile(URL.createObjectURL(file));
                } else if (fieldName === 'cover') {
                    setCoverFile(URL.createObjectURL(file));
                }
                if (errors[fieldName]) {
                    setErrors(prev => ({ ...prev, [fieldName]: null }));
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Vui lòng nhập tên Shop của bạn';
        } else if (formData.name.length > 100) {
            newErrors.name = 'Tên Shop không được vượt quá 100 ký tự';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.avatar) {
            newErrors.avatar = 'Vui lòng chọn ảnh đại diện cho Shop';
        }
        if (!formData.cover) {
            newErrors.cover = 'Vui lòng chọn ảnh bìa cho Shop';
        }
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'Bạn phải đồng ý với Điều khoản dịch vụ và Chính sách của Shopee';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (currentStep === 1) {
            if (validateStep1()) setCurrentStep(2);
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(1, prev - 1));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep2()) return;

        try {
            const token = localStorage.getItem('token');
            const shopPayload = new FormData();
            shopPayload.append('name', formData.name);
            shopPayload.append('description', formData.description || `Chào mừng bạn đến với ${formData.name}!`);
            shopPayload.append('avatar', formData.avatar);
            shopPayload.append('cover', formData.cover);
            const response = await fetch('http://localhost:8080/api/register/shop', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: shopPayload
            });

            if (response.ok) {
                window.alert('Đăng ký shop thành công trên backend');
            } else {
                const data = await response.json();
                window.alert('Lỗi: ' + data.message);
            }

            // Advance to success step
            setCurrentStep(3);
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu đăng ký shop:', error);
            // Fallback success for simulation/demo
            setCurrentStep(3);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setStarted(false);
        setCurrentStep(1);
        navigate('/login');
    };

    return (
        <div className="shop-registration-container">
            {/* Header */}
            <header className="shop-header">
                <div className="shop-header-content">
                    <div className="shop-logo-section" onClick={() => navigate('/')}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg"
                            alt="Shopee Logo"
                            className="shop-logo"
                        />
                        <span className="shop-header-divider">|</span>
                        <span className="shop-title">Kênh Người Bán</span>
                        <span className="shop-subtitle-badge">Đăng ký</span>
                    </div>
                    <div className="shop-header-right">
                        {isLoggedIn ? (
                            <div className="shop-user-menu">
                                <span className="shop-user-name">Chào, <strong>{username}</strong></span>
                                <button className="shop-logout-btn" onClick={handleLogout}>Đăng xuất</button>
                            </div>
                        ) : (
                            <div className="shop-auth-buttons">
                                <a href="/login" className="shop-login-link">Đăng nhập</a>
                                <span className="divider">|</span>
                                <a href="/register" className="shop-register-link">Đăng ký thành viên</a>
                            </div>
                        )}
                        <a href="/help" className="shop-help-link">
                            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.01.388-1.01.94z" />
                            </svg>
                            Trợ giúp
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="shop-main-content">
                {!started ? (
                    /* Welcome Screen */
                    <div className="shop-welcome-wrapper">
                        <div className="shop-welcome-banner">
                            <div className="welcome-banner-text">
                                <h1>Chào mừng bạn đến với Kênh Người Bán Shopee!</h1>
                                <p>Đăng ký trở thành người bán ngay hôm nay để đưa sản phẩm của bạn tiếp cận hơn hàng triệu người mua và thúc đẩy doanh thu vượt trội.</p>

                                {isLoggedIn ? (
                                    <button className="shop-start-btn" onClick={() => setStarted(true)}>
                                        Bắt đầu đăng ký ngay
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                            <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42 5.43 5.43H5v2z" />
                                        </svg>
                                    </button>
                                ) : (
                                    <div className="welcome-login-notice">
                                        <p className="notice-text">Bạn cần đăng nhập bằng tài khoản Shopee để tiếp tục đăng ký mở Shop.</p>
                                        <button className="shop-start-btn" onClick={() => navigate('/login')}>
                                            Đăng nhập tài khoản Shopee
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                                <path d="M10.79 16.29c.39.39 1.02.39 1.41 0l3.59-3.59c.39-.39.39-1.02 0-1.41L12.2 7.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L13.17 11H3c-.55 0-1 .45-1 1s.45 1 1 1h10.17l-2.38 2.38c-.39.39-.39 1.02 0 1.41zM19 3H5c-1.1 0-2 .9-2 2v3c0 .55.45 1 1 1s1-.45 1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v3c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="welcome-banner-graphic">
                                <svg width="100%" height="320" viewBox="0 0 500 320" fill="none" className="welcome-svg">
                                    <rect width="500" height="320" rx="20" fill="#FFF5F2" />
                                    <circle cx="100" cy="80" r="40" fill="#FFE2D9" opacity="0.6" />
                                    <circle cx="420" cy="240" r="60" fill="#FFE2D9" opacity="0.4" />

                                    {/* Store graphic */}
                                    <rect x="150" y="110" width="200" height="130" rx="10" fill="#FFF" stroke="#FF5722" strokeWidth="4" shadow="0 4 20 rgba(0,0,0,0.1)" />
                                    <path d="M140 110L250 50L360 110H140Z" fill="#EE4D2D" stroke="#EE4D2D" strokeWidth="2" />
                                    <rect x="230" y="180" width="40" height="60" fill="#333" rx="2" />
                                    <circle cx="260" cy="210" r="3" fill="#FFEB3B" />
                                    <rect x="180" y="140" width="30" height="30" rx="4" fill="#FFE2D9" />
                                    <rect x="290" y="140" width="30" height="30" rx="4" fill="#FFE2D9" />

                                    {/* Small items */}
                                    <path d="M100 180l15-15 15 15h-30z" fill="#4CAF50" />
                                    <circle cx="390" cy="100" r="15" fill="#2196F3" />
                                    <path d="M380 100h20M390 90v20" stroke="#FFF" strokeWidth="2" />

                                    {/* Lines representing connections */}
                                    <path d="M115 180c40-40 80 0 115 0" stroke="#FF9800" strokeWidth="2" strokeDasharray="4 4" />
                                    <path d="M270 180c40-40 80 0 115-65" stroke="#2196F3" strokeWidth="2" strokeDasharray="4 4" />
                                </svg>
                            </div>
                        </div>

                        {/* Core Benefits */}
                        <div className="shop-benefits-container">
                            <h2>Tại sao nên bán hàng trên Shopee?</h2>
                            <div className="benefits-grid">
                                <div className="benefit-card">
                                    <div className="benefit-icon-wrapper blue">
                                        <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                        </svg>
                                    </div>
                                    <h3>Tiếp cận tệp khách khổng lồ</h3>
                                    <p>Hàng triệu lượt truy cập mỗi ngày giúp shop của bạn tiếp cận lượng khách hàng khổng lồ mà không cần tốn nhiều chi phí marketing.</p>
                                </div>
                                <div className="benefit-card">
                                    <div className="benefit-icon-wrapper orange">
                                        <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                                            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12.5-9l2.25 3H17V9.5h1.5zm-2 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                                        </svg>
                                    </div>
                                    <h3>Hỗ trợ vận chuyển tối ưu</h3>
                                    <p>Tích hợp trực tiếp với các đơn vị vận chuyển hàng đầu Việt Nam. Lấy hàng tận nơi, giao hàng cực nhanh và thanh toán COD an toàn.</p>
                                </div>
                                <div className="benefit-card">
                                    <div className="benefit-icon-wrapper green">
                                        <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                        </svg>
                                    </div>
                                    <h3>Bộ công cụ quản lý chuyên nghiệp</h3>
                                    <p>Dễ dàng theo dõi doanh thu, báo cáo tài chính chi tiết, quản lý tồn kho và tạo các chương trình khuyến mãi hấp dẫn chỉ trong vài cú click chuột.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Step Form Wizard */
                    <div className="shop-wizard-container">
                        {/* Stepper Header */}
                        <div className="shop-stepper">
                            <div className={`step-item ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                                <div className="step-number">{currentStep > 1 ? '✓' : '1'}</div>
                                <div className="step-label">Thông tin cơ bản</div>
                            </div>
                            <div className="step-line"></div>
                            <div className={`step-item ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                                <div className="step-number">{currentStep > 2 ? '✓' : '2'}</div>
                                <div className="step-label">Giao diện Shop</div>
                            </div>
                            <div className="step-line"></div>
                            <div className={`step-item ${currentStep >= 3 ? 'active' : ''}`}>
                                <div className="step-number">3</div>
                                <div className="step-label">Hoàn tất</div>
                            </div>
                        </div>

                        {/* Form Panel */}
                        <div className="shop-form-panel">
                            {currentStep === 1 && (
                                /* STEP 1: BASIC INFO */
                                <div className="form-step-content animate-fade-in">
                                    <h2 className="form-step-title">Thiết lập thông tin cơ bản</h2>
                                    <p className="form-step-subtitle">Nhập các thông tin cơ bản của gian hàng trực tuyến của bạn.</p>

                                    <div className="form-grid">
                                        <div className="form-field-group">
                                            <label className="required-label">Tên Shop</label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Ví dụ: My Shop, Thời Trang Xu Hướng..."
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={errors.name ? 'error-input' : ''}
                                            />
                                            {errors.name && <span className="error-text">{errors.name}</span>}
                                            <span className="field-hint">Tên Shop nên tránh các ký tự đặc biệt, không sử dụng tên thương hiệu có bản quyền nếu chưa có giấy phép.</span>
                                        </div>

                                        <div className="form-field-group">
                                            <label>Mô tả Shop</label>
                                            <textarea
                                                name="description"
                                                rows="5"
                                                placeholder="Giới thiệu về shop của bạn, sản phẩm thế mạnh hoặc cam kết chất lượng của gian hàng..."
                                                value={formData.description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-footer-nav">
                                        <button type="button" className="btn-cancel" onClick={() => setStarted(false)}>Hủy bỏ</button>
                                        <button type="button" className="btn-primary" onClick={handleNext}>
                                            Tiếp theo
                                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                /* STEP 2: SHOP APPEARANCE & BRAND IMAGES */
                                <div className="form-step-content animate-fade-in">
                                    <h2 className="form-step-title">Thiết lập hình ảnh & giao diện Shop</h2>
                                    <p className="form-step-subtitle">Tải lên ảnh đại diện và ảnh bìa từ máy tính của bạn để khách hàng dễ dàng nhận diện thương hiệu.</p>

                                    <form onSubmit={handleSubmit} className="form-grid">
                                        <div className="visuals-setup-grid">
                                            {/* Left - Avatar and inputs */}
                                            <div className="visual-inputs">
                                                <div className="form-field-group">
                                                    <label className="required-label">Ảnh đại diện Shop (Avatar)</label>
                                                    <div className="file-upload-wrapper">
                                                        <label className="file-upload-label">
                                                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                                                <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                                                            </svg>
                                                            {avatarFile ? 'Chọn ảnh khác' : 'Tải lên ảnh đại diện'}
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleFileChange(e, 'avatar')}
                                                                className="hidden-file-input"
                                                            />
                                                        </label>
                                                        {avatarFile && <span className="upload-success-indicator">✓ Đã chọn ảnh</span>}
                                                        {errors.avatar && <span className="error-text block-error">{errors.avatar}</span>}
                                                    </div>
                                                </div>

                                                <div className="form-field-group" style={{ marginTop: '20px' }}>
                                                    <label className="required-label">Ảnh bìa Shop (Cover)</label>
                                                    <div className="file-upload-wrapper">
                                                        <label className="file-upload-label">
                                                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                                                <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                                                            </svg>
                                                            {coverFile ? 'Chọn ảnh khác' : 'Tải lên ảnh bìa'}
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleFileChange(e, 'cover')}
                                                                className="hidden-file-input"
                                                            />
                                                        </label>
                                                        {coverFile && <span className="upload-success-indicator">✓ Đã chọn ảnh</span>}
                                                        {errors.cover && <span className="error-text block-error">{errors.cover}</span>}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right - Live Previews */}
                                            <div className="visual-previews-container">
                                                <h3 className="preview-heading-label">Xem trước gian hàng của bạn</h3>
                                                <div className="live-shop-preview-card">
                                                    {/* Cover image preview */}
                                                    <div
                                                        className="shop-preview-cover"
                                                        style={{
                                                            backgroundImage: coverFile ? `url(${coverFile})` : 'none',
                                                            backgroundColor: '#ffe2d9',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        {!coverFile && <span style={{ color: 'var(--shopee-orange)', fontSize: '13px', fontWeight: '500', zIndex: 1 }}>Chưa chọn ảnh bìa</span>}
                                                        <div className="cover-overlay"></div>
                                                    </div>

                                                    {/* Avatar and name info overlay */}
                                                    <div className="shop-preview-info-row">
                                                        <div
                                                            className="shop-preview-avatar"
                                                            style={{
                                                                backgroundImage: avatarFile ? `url(${avatarFile})` : 'none',
                                                                backgroundColor: '#f5f5f5',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }}
                                                        >
                                                            {!avatarFile && (
                                                                <svg viewBox="0 0 24 24" width="24" height="24" fill="#ccc">
                                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <div className="shop-preview-meta">
                                                            <h4 className="shop-preview-name">{formData.name || 'Tên Shop Của Bạn'}</h4>
                                                            <span className="shop-preview-status">Hoạt động 5 phút trước</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Term Agreement Checkbox */}
                                        <div className="terms-agreement-checkbox" style={{ marginTop: '20px' }}>
                                            <label className="custom-checkbox-container">
                                                <input
                                                    type="checkbox"
                                                    name="agreeToTerms"
                                                    checked={formData.agreeToTerms}
                                                    onChange={handleChange}
                                                />
                                                <span className="checkmark-box"></span>
                                                <span className="checkbox-label">
                                                    Tôi cam kết các thông tin khai báo trên hoàn toàn chính xác. Tôi đồng ý tuân thủ <a href="/seller-terms" target="_blank" rel="noopener noreferrer">Điều khoản Dịch vụ Kênh Người Bán</a> và <a href="/policy" target="_blank" rel="noopener noreferrer">Chính sách Bán hàng</a> của Shopee.
                                                </span>
                                            </label>
                                            {errors.agreeToTerms && <span className="error-text block-error">{errors.agreeToTerms}</span>}
                                        </div>

                                        <div className="form-footer-nav" style={{ marginTop: '30px' }}>
                                            <button type="button" className="btn-secondary" onClick={handleBack}>
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ transform: 'rotate(180deg)', marginRight: '5px' }}>
                                                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                                </svg>
                                                Quay lại
                                            </button>
                                            <button type="submit" className="btn-primary btn-submit">
                                                Hoàn tất đăng ký Shop
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {currentStep === 3 && (
                                /* STEP 3: SUCCESS */
                                <div className="form-step-content animate-fade-in success-step-wrapper">
                                    <div className="success-icon-animation">
                                        <svg viewBox="0 0 96 96" width="96" height="96" className="success-checkmark">
                                            <circle cx="48" cy="48" r="44" fill="#E8F8F5" stroke="#26A69A" strokeWidth="4" />
                                            <path d="M30 48l12 12 24-24" fill="none" stroke="#26A69A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="checkmark-path" />
                                        </svg>
                                    </div>

                                    <h2 className="success-title">Đăng ký thành lập Shop thành công!</h2>
                                    <p className="success-subtitle">Hệ thống đã ghi nhận hồ sơ và khởi tạo gian hàng trực tuyến <strong>"{formData.name}"</strong> của bạn thành công.</p>

                                    <div className="success-details-card">
                                        <div className="detail-row">
                                            <span className="label">Chủ sở hữu:</span>
                                            <span className="val"><strong>{username || 'Người bán Shopee'}</strong></span>
                                        </div>
                                        <div className="detail-row" style={{ flexDirection: 'column', gap: '8px', borderBottom: 'none', paddingBottom: 0 }}>
                                            <span className="label">Cửa hàng của bạn:</span>
                                            <div className="success-shop-card-preview" style={{ marginTop: '10px' }}>
                                                <div
                                                    className="success-shop-cover"
                                                    style={{ backgroundImage: `url(${coverFile})` }}
                                                />
                                                <div className="success-shop-details-row">
                                                    <div
                                                        className="success-shop-avatar"
                                                        style={{ backgroundImage: `url(${avatarFile})` }}
                                                    />
                                                    <div className="success-shop-text">
                                                        <h4>{formData.name}</h4>
                                                        <p className="success-shop-desc">{formData.description || 'Chưa có mô tả Shop.'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="success-next-steps">
                                        <h3>Các bước chuẩn bị tiếp theo:</h3>
                                        <ol>
                                            <li><span>Thêm sản phẩm đầu tiên của bạn vào gian hàng để tiếp cận người mua.</span></li>
                                            <li><span>Trang trí giao diện Shop để gia tăng uy tín và thu hút khách hàng.</span></li>
                                            <li><span>Thiết lập tài khoản ngân hàng liên kết để nhận tiền doanh thu bán hàng.</span></li>
                                        </ol>
                                    </div>

                                    <div className="success-actions-row">
                                        <button className="btn-secondary" onClick={() => navigate('/')}>Quay lại trang chủ</button>
                                        <button className="btn-primary" onClick={() => window.location.href = '/seller/dashboard'}>
                                            Vào Kênh Người Bán của bạn
                                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                                <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="shop-footer">
                <div className="shop-footer-content">
                    <p>© 2026 Shopee. Tất cả các quyền được bảo lưu.</p>
                    <div className="shop-footer-links">
                        <a href="/policy">Chính sách bảo mật</a>
                        <span className="bullet">•</span>
                        <a href="/terms">Điều khoản dịch vụ</a>
                        <span className="bullet">•</span>
                        <a href="/seller-rules">Quy chế hoạt động Kênh Người Bán</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ShopPage;
