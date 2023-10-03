import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

const HomeLinkContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginationContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OriginalPrice = styled("p")`
  text-decoration: line-through;
  color: red;
`;

const DiscountedPriceContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    margin: 0;
    line-height: 1.7;
  }
`;

const ProductItem = styled(Grid)`
  .product-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #eef5f8;
    height: 100%;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 400px;
  }

  .product-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const Product = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    let info = localStorage.getItem("user-info");

    if (info) {
      info = JSON.parse(info);
    }
    console.log(info.token);
    const config = {
      headers: {
        Authorization: `Bearer ${info.token}`,
      },
    };

    axios
      .get(`http://localhost:8080/api/products`, config)
      .then((response) => {
        console.log("dt", response.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const totalPages = Math.ceil(products.length / pageSize);

  const handlePageChange = (pageNumber) => {
    setPageIndex(pageNumber);
  };

  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {currentProducts.map((product) => (
        <ProductItem item key={product._id} xs={12} sm={6} md={4}>
          <div className="product-info">
            <Typography variant="h5">{product.name}</Typography>
            <img src={product.image} alt={product.name} />
            {product.discount && (
              <DiscountedPriceContainer>
                <OriginalPrice>
                  {parseFloat(product.price).toLocaleString()}đ
                </OriginalPrice>
                <Typography>
                  {(
                    parseFloat(product.price) -
                    parseFloat(product.price) * 0.2
                  ).toLocaleString()}
                  đ
                </Typography>
                <Typography color="red">-20%</Typography>
              </DiscountedPriceContainer>
            )}
            <div className="product-details">
              <Link to={`/products/${product._id}`}>Xem chi tiết</Link>
            </div>
          </div>
        </ProductItem>
      ))}
      <Grid item xs={12} className="pagination">
        <HomeLinkContainer>
          <Link to="/home">Quay về trang chủ</Link>
        </HomeLinkContainer>
        <PaginationContainer>
          {pageNumbers.map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              className={pageIndex === page ? "active" : ""}
            >
              Trang {page}
            </Button>
          ))}
        </PaginationContainer>
      </Grid>
    </Grid>
  );
};

export default Product;
