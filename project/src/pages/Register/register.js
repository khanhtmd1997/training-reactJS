import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "./register.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function RegisterPage() {
  //Khởi tạo các state var
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  //Check validate
  const validate = () => {
    let isValid = true;
    const error = {};
    if (!fullName) {
      error.fullName = "Họ tên không được để trống";
    } else {
      error.fullName = "";
    }
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

    if (error.email === "" && error.password === "" && error.fullName === "")
      isValid = true;
    else isValid = false;
    setErrors(error);
    console.log(email, password, fullName, phone, address);
    return isValid;
    // return true/ false error
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    const data = { email, password, fullName, phone, address };

    if (isValid) {
      axios({
        method: "post",
        url: "http://localhost:8080/api/register",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          // Xử lý đăng nhập thành công
          if (response.status === 200) {
            const result = response.data;
            localStorage.setItem("user-info", JSON.stringify(result));
            navigate("/login");
          }
        })
        .catch((error) => {
          // Xử lý khi xảy ra lỗi
          console.error("An error occurred:", error);
          console.log(error.response.data.message);
          alert(error.response.data.message);
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
          Đăng kí
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Stack direction="row">
            <Avatar
              alt="3S"
              src="https://khamphahue.com.vn/Portals/0/Medias/Nam2022/T10/Logo3S.png"
              sx={{
                width: 60,
                height: 60,
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
            autoFocus
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="fullname"
            label="Fullname"
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            id="fullname"
            autoComplete="off"
          />
          {errors.fullName && <div className="error">{errors.fullName}</div>}
          <TextField
            margin="normal"
            fullWidth
            name="phone"
            label="Phone"
            onChange={(e) => setPhone(e.target.value)}
            type="phone"
            id="phone"
            autoComplete="off"
          />
          <TextField
            margin="normal"
            fullWidth
            name="address"
            label="Address"
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            id="address"
            autoComplete="off"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng kí
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default RegisterPage;
