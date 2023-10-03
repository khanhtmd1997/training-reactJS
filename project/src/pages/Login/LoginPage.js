import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "./Login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function LoginPage() {
  //Khởi tạo các state var
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  //Check validate
  const validate = () => {
    let isValid = true;
    const error = {};
    if (!email) {
      error.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.email = "Email không đúng định dạng";
    } else {
      error.email = "";
    }
    if (!password) {
      error.password = "Mật khẩu không được để trống";
    } else if (password.length < 8) {
      error.password = "Mật khẩu phải ít nhất 8 ký tự";
    } else {
      error.password = "";
    }

    if (error.email === "" && error.password === "") isValid = true;
    else isValid = false;
    setErrors(error);
    return isValid;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    const data = { email, password };
    console.log(data);
    if (isValid) {
      axios({
        method: "post",
        url: "http://localhost:8080/api/login",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          // Xử lý đăng nhập thành công
          if (response.status === 200) {
            const result = response.data;
            // lưu thông tin  người dùng vào localStorage
            localStorage.setItem("user-info", JSON.stringify(result));
            navigate("/");
          }
        })
        .catch((error) => {
          // Xử lý khi xảy ra lỗi
          console.error("An error occurred:", error);
          alert("Tài khoản hoặc mật khẩu không đúng");
        });
    }
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Stack direction="row">
            <Avatar
              alt="3S"
              src="https://khamphahue.com.vn/Portals/0/Medias/Nam2022/T10/Logo3S.png"
              sx={{
                width: 80,
                height: 80,
              }}
            />
          </Stack>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            autoComplete="off"
          />
          {errors.email && <div className="error">{errors.email}</div>}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            autoComplete="off"
          />
          {errors.password && <div className="error">{errors.password}</div>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default LoginPage;
