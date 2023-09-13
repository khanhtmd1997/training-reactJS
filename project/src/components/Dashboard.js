import React from 'react';
import LoginPage from './LoginPage';
import Product from './Product';
import ProductDetails from './ProductDetails';

const Dashboard = () => {
  return (
    <div>
      <h1>Đăng nhập</h1>
      <LoginPage />

      <h1>Danh sách sản phẩm</h1>
      <Product />

      <h1>Chi tiết sản phẩm</h1>
      <ProductDetails productId="1" />
    </div>
  );
};

export default Dashboard;