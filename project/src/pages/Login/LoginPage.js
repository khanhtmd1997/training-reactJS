import React,{ useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Login.css';

 function LoginPage  () {
 //Khởi tạo các state var
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  // useEffect(() => {
  //   setErrors({email:'', password:''});
  // }); 
 //Check validate
  const validate = () => {
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
    setErrors(error);
    // return true/ false error
    // return true;
      // Kiểm tra nếu có lỗi trong error object
  for (let key in error) {
    if (error[key] !== "") {
      return {
        isValid: false,
        error: error
      };
    }
  }

  // Nếu không có lỗi, trả về true và không có error
  return {
    isValid: true,
    error: {}
  };
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const data = { email: email, password: password }
    const validationResult = validate();
    
    if (validationResult.isValid) {
      axios({
        method: 'post',
        url: 'http://localhost:8080/api/login', 
        data,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((response) => {
          // Xử lý đăng nhập thành công
          if (response.status === 200) {
            const result = response.data;
            localStorage.setItem("user-info", JSON.stringify(result));
            navigate('/HomePage');
          }
        })
        .catch((error) => {
          // Xử lý khi xảy ra lỗi
          console.error("An error occurred:", error);
          alert('Tài khoản hoặc mật khẩu không đúng');
        });
    } else {
      // Xử lý khi dữ liệu không hợp lệ
      console.log(validationResult.error);
    }
  }
  
 return (
    <div className="container">
      <div className="form_container">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="text"
              onChange={(e) => setEmail(e.target.value)}/>
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <button onClick= {handleSubmit}type="submit">Đăng nhập</button>
          <div>or</div>\
          <button type="submit">Đăng kí</button>
          </form>
      </div>
    </div>
   );
   };
  
export default LoginPage;