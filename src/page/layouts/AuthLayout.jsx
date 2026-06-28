import AuthHeader from "../componentlayout/auth/AuthHeader";
import { Outlet } from "react-router-dom";
import Footer from "../componentlayout/main/Footer";
const AuthLayout = () => {
    return (
        <div>
            <AuthHeader />
            <Outlet />
            <Footer />
        </div>
    );
};
export default AuthLayout;