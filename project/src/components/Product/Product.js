import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';
   const Product = () => {
     const [products, setProducts] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [totalPages, setTotalPages] = useState(1);

     useEffect(() => {
       const fetchProducts = async () => {
         try {
           const response = await axios.get('http://localhost:8080/api/products', {
             params: { page: currentPage },
           });
           setProducts(response.data.products);
           setTotalPages(response.data.totalPages);
         } catch (error) {
           console.error(error);
         }
       };

       fetchProducts();
     }, [currentPage]);

     const handlePageChange = (page) => {
       setCurrentPage(page);
     };
// sd map lặp qua mảng product và hiển thị tên của mỗi sản phẩm.
     return (
       <div>
         <ul>
           {products.map((product) => (
             <li key={product.id}>{product.name}</li>
           ))}
         </ul>
         <div>
           {Array.from({ length: totalPages }, (_, index) => (
             <button
               key={index}
               onClick={() => handlePageChange(index + 1)}
               disabled={index + 1 === currentPage}
             >
               {index + 1}
             </button>
           ))}
         </div>
       </div>
     );
   };
  //tạo một mảng các số từ 1 đến totalPages
  //sử dụng map để tạo các button phân trang.
  //Khi người dùng nhấp vào một button phân trang, chúng ta gọi hàm handlePageChange để cập nhật currentPage với trang tương ứng.

   export default Product;
   