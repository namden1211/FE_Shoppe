import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
    // Banner Carousel State
    const [currentSlide, setCurrentSlide] = useState(0);
    const banners = [
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
    ];

    // Banner auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [banners.length]);

    // Flash Sale Countdown State (3 hours countdown)
    const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 59, seconds: 59 });
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else {
                    return { hours: 2, minutes: 59, seconds: 59 }; // reset timer
                }
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Format timer digits helper
    const formatDigit = (num) => String(num).padStart(2, '0');

    // Mock Data for Categories
    const categories = [
        { name: "Thời Trang Nam", img: "https://cdn-icons-png.flaticon.com/128/11832/11832360.png" },
        { name: "Điện Thoại & Phụ Kiện", img: "https://cdn-icons-png.flaticon.com/128/3128/3128317.png" },
        { name: "Thiết Bị Điện Tử", img: "https://cdn-icons-png.flaticon.com/128/900/900261.png" },
        { name: "Máy Tính & Laptop", img: "https://cdn-icons-png.flaticon.com/128/428/428001.png" },
        { name: "Mẹ & Bé", img: "https://cdn-icons-png.flaticon.com/128/2810/2810332.png" },
        { name: "Nhà Cửa & Đời Sống", img: "https://cdn-icons-png.flaticon.com/128/1237/1237946.png" },
        { name: "Sắc Đẹp", img: "https://cdn-icons-png.flaticon.com/128/3120/3120623.png" },
        { name: "Sức Khỏe", img: "https://cdn-icons-png.flaticon.com/128/2966/2966327.png" },
        { name: "Giày Dép Nam", img: "https://cdn-icons-png.flaticon.com/128/5499/5499206.png" },
        { name: "Túi Ví Nữ", img: "https://cdn-icons-png.flaticon.com/128/2928/2928828.png" }
    ];

    // Mock Data for Flash Sale
    const flashProducts = [
        {
            id: 101,
            price: 99000,
            salePercent: 45,
            sold: 28,
            max: 30,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 102,
            price: 189000,
            salePercent: 30,
            sold: 15,
            max: 50,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 103,
            price: 49000,
            salePercent: 60,
            sold: 48,
            max: 50,
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 104,
            price: 799000,
            salePercent: 25,
            sold: 2,
            max: 10,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 105,
            price: 12000,
            salePercent: 80,
            sold: 99,
            max: 100,
            image: "https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 106,
            price: 345000,
            salePercent: 15,
            sold: 8,
            max: 12,
            image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=300&q=80"
        }
    ];

    // Mock Data for Daily Discover Products
    const discoverProducts = [
        {
            id: 1,
            title: "Tai Nghe Bluetooth Không Dây HIFI Stereo Âm Thanh Sống Động Chống Ồn Cực Tốt",
            price: 159000,
            soldCount: "1.2k",
            location: "TP. Hồ Chí Minh",
            isMall: true,
            voucher: "Giảm 10k",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 2,
            title: "Giày Sneaker Nam Nữ Thể Thao Thiết Kế Trẻ Trung Đàn Hồi Cực Tốt Đi Êm Chân",
            price: 249000,
            soldCount: "856",
            location: "Hà Nội",
            isMall: false,
            voucher: "Mua kèm deal sốc",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 3,
            title: "Bình Nước Giữ Nhiệt Cao Cấp Inox 316 Dung Tích 800ml Giữ Lạnh Đến 24 Giờ",
            price: 125000,
            soldCount: "3.4k",
            location: "Đà Nẵng",
            isMall: true,
            voucher: "Miễn phí vận chuyển",
            image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 4,
            title: "Đồng Hồ Thông Minh Đo Nhịp Tim Theo Dõi Sức Khỏe Màn Hình Cảm Ứng Retina",
            price: 680000,
            soldCount: "428",
            location: "TP. Hồ Chí Minh",
            isMall: false,
            voucher: "Hoàn xu 10%",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 5,
            title: "Kính Mát Thời Trang Unisex Chống Tia UV400 Phong Cách Hàn Quốc Cao Cấp",
            price: 89000,
            soldCount: "5.1k",
            location: "Hà Nội",
            isMall: false,
            voucher: "Giảm 5k",
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 6,
            title: "Áo Thun Nam Nữ Cotton Basic Cổ Tròn Dày Dặn Co Giãn Thấm Hút Mồ Hôi Tốt",
            price: 99000,
            soldCount: "10k+",
            location: "Bình Dương",
            isMall: true,
            voucher: "Mua 2 tặng 1",
            image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 7,
            title: "Balo Thời Trang Chống Nước Ngăn Chứa Rộng Rãi Tiện Lợi Đi Học Đi Làm",
            price: 195000,
            soldCount: "921",
            location: "Đồng Nai",
            isMall: false,
            voucher: "Gói FreeShip",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 8,
            title: "Sạc Dự Phòng Dung Lượng 20000mAh Hỗ Trợ Sạc Nhanh 22.5W Có Đèn LED Báo Pin",
            price: 299000,
            soldCount: "1.9k",
            location: "TP. Hồ Chí Minh",
            isMall: true,
            voucher: "Hoàn 20k",
            image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 9,
            title: "Đèn Bàn Học LED Chống Cận Thị 3 Chế Độ Sáng Linh Hoạt Bảo Vệ Mắt Bé",
            price: 119000,
            soldCount: "2.3k",
            location: "Hà Nội",
            isMall: false,
            voucher: "Giảm 15%",
            image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 10,
            title: "Chuột Máy Tính Không Dây Bluetooth Silent Thiết Kế Công Thái Học Êm Ái",
            price: 145000,
            soldCount: "4.8k",
            location: "TP. Hồ Chí Minh",
            isMall: true,
            voucher: "Deal 0đ",
            image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 11,
            title: "Thảm Tập Yoga TPE 2 Lớp Chống Trơn Trượt Độ Đàn Hồi Cao Dày 6mm",
            price: 180000,
            soldCount: "740",
            location: "Đà Nẵng",
            isMall: false,
            voucher: "Mua kèm deal sốc",
            image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 12,
            title: "Cốc Sứ Họa Tiết Bắc Âu Có Nắp Đậy Và Thìa Inox Cao Cấp Sang Trọng",
            price: 65000,
            soldCount: "1.5k",
            location: "TP. Hồ Chí Minh",
            isMall: false,
            voucher: "Giảm 5k",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + banners.length) % banners.length);
    };

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
    };

    return (
        <div className="homepage-container">
            {/* Banner Section */}
            <div className="banner-section">
                <div className="banner-carousel">
                    <div
                        className="banner-slide"
                        style={{ backgroundImage: `url(${banners[currentSlide]})` }}
                    />
                    <button className="carousel-btn prev" onClick={prevSlide}>&lt;</button>
                    <button className="carousel-btn next" onClick={nextSlide}>&gt;</button>
                    <div className="carousel-dots">
                        {banners.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="banner-right-side">
                    <div
                        className="sub-banner"
                        style={{ backgroundImage: `url("https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=400&q=80")` }}
                    />
                    <div
                        className="sub-banner"
                        style={{ backgroundImage: `url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80")` }}
                    />
                </div>
            </div>

            {/* Promo Badges Section */}
            <div className="promo-strip">
                <div className="promo-item">
                    <div className="promo-icon-wrapper">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="var(--shopee-orange)">
                            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                        </svg>
                    </div>
                    <span>Miễn Phí Vận Chuyển</span>
                </div>
                <div className="promo-item">
                    <div className="promo-icon-wrapper">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="#00bfa5">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
                        </svg>
                    </div>
                    <span>Khung Giờ Săn Sale</span>
                </div>
                <div className="promo-item">
                    <div className="promo-icon-wrapper">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="#ffb300">
                            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
                        </svg>
                    </div>
                    <span>Voucher Giảm Giá</span>
                </div>
                <div className="promo-item">
                    <div className="promo-icon-wrapper">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="#e53935">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                    </div>
                    <span>Hàng Hiệu Giá Tốt</span>
                </div>
                <div className="promo-item">
                    <div className="promo-icon-wrapper">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="#1e88e5">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                    </div>
                    <span>Hàng Quốc Tế</span>
                </div>
            </div>

            {/* Shopee Category List */}
            <div className="section-container">
                <div className="section-header">
                    <span className="section-title">Danh Mục</span>
                </div>
                <div className="categories-grid">
                    {categories.map((cat, index) => (
                        <div className="category-card" key={index}>
                            <img src={cat.img} alt={cat.name} className="category-image" />
                            <span className="category-name">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Flash Sale Section */}
            <div className="section-container">
                <div className="section-header">
                    <div className="flash-sale-header">
                        <span className="flash-sale-logo">FLASH SALE</span>
                        <div className="countdown-timer">
                            <div className="timer-box">{formatDigit(timeLeft.hours)}</div>
                            <span className="timer-colon">:</span>
                            <div className="timer-box">{formatDigit(timeLeft.minutes)}</div>
                            <span className="timer-colon">:</span>
                            <div className="timer-box">{formatDigit(timeLeft.seconds)}</div>
                        </div>
                    </div>
                    <a href="#viewall" className="section-link">Xem tất cả &gt;</a>
                </div>
                <div className="flash-sale-grid">
                    {flashProducts.map((prod) => {
                        const progressPercent = Math.min((prod.sold / prod.max) * 100, 100);
                        return (
                            <div className="flash-product-card" key={prod.id}>
                                <div className="flash-image-wrapper">
                                    <img src={prod.image} alt="Flash product" className="flash-product-image" />
                                    <div className="sale-badge">
                                        <span className="sale-percent">{prod.salePercent}%</span>
                                        <span className="sale-text">giảm</span>
                                    </div>
                                </div>
                                <div className="flash-price-info">
                                    <span className="flash-price">
                                        <span className="flash-price-symbol">₫</span>
                                        {formatPrice(prod.price)}
                                    </span>
                                </div>
                                <div className="flash-stock-progress">
                                    <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
                                    <span className="progress-text">
                                        {prod.sold === prod.max ? "Bán hết" : `Đã bán ${prod.sold}`}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Daily Discover Section */}
            <div className="discover-tab">
                <div className="tab-item">Gợi ý hôm nay</div>
            </div>

            <div className="products-grid">
                {discoverProducts.map((prod) => (
                    <div className="product-card" key={prod.id}>
                        <div className="product-image-container">
                            <img src={prod.image} alt={prod.title} className="product-card-image" />
                            {prod.isMall && <div className="shopee-mall-tag">Mall</div>}
                        </div>
                        <div className="product-details">
                            <div className="product-title">{prod.title}</div>
                            <div className="product-tags-row">
                                <span className="voucher-tag">{prod.voucher}</span>
                            </div>
                            <div className="product-price-row">
                                <span className="product-card-price">₫{formatPrice(prod.price)}</span>
                                <span className="product-sold-count">Đã bán {prod.soldCount}</span>
                            </div>
                            <div className="product-footer-location">{prod.location}</div>
                        </div>
                        <div className="hover-action-overlay">
                            Tìm sản phẩm tương tự
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
