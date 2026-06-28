import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from '../register/RegisterPage';
import LoginPage from '../login/LoginPage';
import ShopPage from '../shop/CreateShop';
import HomePage from '../home/HomePage';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} >
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route>
          <Route path="/shop" element={<ShopPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
