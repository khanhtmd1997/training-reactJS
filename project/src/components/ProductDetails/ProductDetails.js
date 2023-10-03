import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

const ProductDetailsContainer = styled(Container)`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const ProductCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  width: 100%;
`;

const ProductGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;

const ProductImage = styled("img")`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const ProductInfoContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OriginalPrice = styled("p")`
  text-decoration: line-through;
  color: red;
`;

const DiscountedPriceContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

const BuyNowLink = styled(Link)`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: fit-content;
`;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IFNlcCAxNCAyMDIzIDEwOjAxOjAyIEdNVCswNzAwIChOb3Zvc2liaXJzayBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6IjY1MDI3NzQ5Yzc1NzhjOTgzM2E3YWRkMiIsImlhdCI6MTY5NDY2MDQ2Mn0.CMRsOlBHZjJjsu1wsjiOjd0-jsCCerlZLVfrrOJ53VU`,
      },
    };

    axios
      .get(`http://localhost:8080/api/products/${id}`, config)
      .then((response) => {
        console.log("dt", response.data);
        setProduct(response.data.data);
      });
  }, [id]);

  return (
    <ProductDetailsContainer maxWidth="md">
      <ProductCard>
        <ProductGrid container>
          <Grid item xs={12} md={6}>
            <ProductImage src={product.image} alt={product.name} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProductInfoContainer>
              <Typography variant="h5">{product.name}</Typography>

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
              <BuyNowLink to="/cart">
                <Button variant="contained" color="primary">
                  Mua ngay
                </Button>
              </BuyNowLink>
              <Box
                sx={{ p: 2, bgcolor: "background.paper", marginLeft: "auto" }}
              >
                <Typography>Bộ nhớ: {product.memory}GB</Typography>
                <Typography>Màu sắc: {product.color}</Typography>
                <Typography>
                  Công nghệ màn hình: {product.screenTechnology}
                </Typography>
                <Typography>
                  Màn hình độ phân giải: {product.resolutionScreen}
                </Typography>
                <Typography>Màn hình rộng: {product.widescreen}</Typography>
                <Typography>
                  Độ sáng tối đa: {product.maximumBrightness}
                </Typography>
                <Typography>Màn hình cảm ứng: {product.touchScreen}</Typography>
                <Typography>
                  Độ phân giải Camera sau: {product.resolutionRearCamera}
                </Typography>
                <Typography>Flash: {product.flash}</Typography>
                <Typography>
                  Độ phân giải Camera trước: {product.resolutionFrontCamera}
                </Typography>
                <Typography>Mô tả: {product.description}</Typography>
              </Box>
              <Link to="/products">Quay về trang sản phẩm</Link>
            </ProductInfoContainer>
          </Grid>
        </ProductGrid>
      </ProductCard>
    </ProductDetailsContainer>
  );
};

export default ProductDetails;
