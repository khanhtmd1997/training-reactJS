import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductDetails.css';

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
// gọi hàm fetchProduct mỗi khi productId thay đổi
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);
// nếu product là null, chưa nhận được dữ liệu từ API, hiển thị một thông báo "Loading..."
  if (!product) {
    return <div>Loading...</div>;
  }
// nếu product tồn tại, hiển thị thông tin chi tiết về sản phẩm
  return (
    <div>
      <h2>{product.name}</h2>
      <h3>{product.price}</h3>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetail;
