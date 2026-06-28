import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { HeaderPathname, initialState } from "../../reducer/HeaderPathname";
import './AuthHeader.css';
const AuthHeader = () => {
    const location = useLocation();
    const [state, dispatch] = React.useReducer(HeaderPathname, initialState);
    React.useEffect(() => {
        if (location.pathname === "/login") {
            dispatch({ type: "CHANGE_PATHNAME", payload: "Đăng nhập" });
        }

        if (location.pathname === "/register") {
            dispatch({ type: "CHANGE_PATHNAME", payload: "Đăng ký" });
        }
    }, [location.pathname])

    return (
        <header className="login-header">
            <div className="login-header-content">
                <div className="login-logo-section">
                    <Link to="/">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg"
                            alt="Shopee Logo"
                            className="login-logo"
                        />
                    </Link>
                    <span className="login-title">{state.pathname}</span>
                </div>
                <a href="/help" className="login-help">Bạn cần giúp đỡ?</a>
            </div>
        </header>
    );
};

export default AuthHeader;