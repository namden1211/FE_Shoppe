import React from 'react';
import Header from "../componentlayout/main/Header";
import { Outlet } from 'react-router-dom';
import Footer from "../componentlayout/main/Footer";
const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;