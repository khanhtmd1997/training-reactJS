import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { authGetData } from "./utils/request";

function App() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    setData({
      ...data,
      [e.target.attributes[1].nodeValue]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (data.email && data.password) {
      axios
        .post("http://localhost:8080/api/login", data)
        .then(function (response) {
          localStorage.setItem("token_reactjs", response.data.token);
          if (response.data.statusCode === 200) {
            alert("Đăng nhập thành công");
            // Set config defaults when creating the instance
            authGetData({
              url: `http://localhost:8080/api/users/${response.data.user._id}`,
              setLoading,
              onSuccess: (res) => {
                console.log(res);
              },
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          alert(error.response.data.message);
        });
    }
  }

  return (
    <form action="">
      <label>Username</label>
      <input type="email" name="email" onChange={(e) => handleChange(e)} />
      <label>Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => handleChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Login
      </button>
    </form>
  );
}

export default App;
