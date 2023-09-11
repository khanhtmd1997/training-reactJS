import React, { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './LoginPage.css';

// validate form input values
const isEmptyValue = (value) => {
    return !value || value.trim().length === 0
};

const isEmailValid = (email) => {
    return /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email);
};

const isPasswordValid = (password) => {
    console.log(1, password);
    return password.length < 8;
}

// rendering the login page.
function Login() {
    //redirect..
    const navigate = useNavigate();
    //----------

    const [formValue, setFormValue] = useState("");
    const [formError, setFormError] = useState({});

    // validate the form input values and update the formError
    const validateForm = (formValue, name) => {
        const error = {};
        console.log(123, formValue, name);

        if (name === 'email') {
            if (isEmptyValue(formValue)) {
                error["email"] = "Email is required";
            } else {
                if (!isEmailValid(formValue)) {
                    error["email"] = "Please enter a valid email format";
                }
            }
        } else {
            if (isEmptyValue(formValue)) {
                error["password"] = "Password is required";
            } else {

                if (isPasswordValid(formValue)) {
                    error["password"] = "Password must be at least 8 characters";
                }
            }
        }
        setFormError(error);
        return Object.keys(error).length === 0;
    }

    // update the formValue state when the user types into the email or password input fields
    const handleChange = useCallback((event) => {
        const { value, name } = event.target;
        setFormValue((prevFormValue) => ({
            ...prevFormValue,
            [name]: value,
        }));
        validateForm(value, name);
    }, []);

    // triggered when the user submits the form.
    const handleSubmitLogin = async (event) => {
        event.preventDefault();

        //Call API
        try {
            const response = await axios({
                method: 'post',
                url: "http://localhost:8080/api/login",
                data: formValue
            })

            console.log(response);
            if (response.data.statusCode === 200) {
                const result = response.data; // Axios phân tích JSON
                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem("user-info", JSON.stringify(result));
                // Chuyển hướng đến trang chủ
                navigate('/');
            }
            else {
                if (response.data.statusCode === 422) {
                    console.log(response.data.data);
                    let errorMessages = "";
                    // Hiển thị thông báo lỗi từ response.data.data
                    // .hasOwnProperty(key)
                    for (const key in response.data.data) {
                        if (response.data.data[key]) {
                            const value = response.data.data[key];
                            errorMessages += `${value}\n`;
                        }
                    }
                    alert(errorMessages);
                }
            };
        }
        catch (error) {
            console.error("An error occurred:", error);
            alert('Có lỗi xảy ra khi đăng nhập');
        }
    }

    return (
        <div className="login-page">
            <div className="login-form-container">
                <h1 className="title">Login</h1>
                <div className="logo-container mb-16">
                    <img className="logo" src="https://one.3si.vn/one3s_web/static/src/img/logo-3s-horizontal.png" alt="logo-3S" />
                </div>

                <form onSubmit={handleSubmitLogin}>
                    <div className="mb-16">
                        <label htmlFor="email" className="form-label mb-8">
                            Email
                        </label>
                        <input
                            id="email"
                            className="form-control"
                            type="text"
                            name="email"
                            onChange={handleChange}
                        />
                        {formError.email && (
                            <div className="error-feedback">{formError.email}</div>
                        )}
                    </div>

                    <div className="mb-16">
                        <label htmlFor="password" className="form-label mb-8">
                            Password
                        </label>
                        <input
                            id="password"
                            className="form-control"
                            type="password"
                            name="password"
                            onChange={handleChange}
                        />
                        {formError.password && (
                            <div className="error-feedback">{formError.password}</div>
                        )}
                    </div>

                    <button type="submit" className="btn-submit-login">Login</button>
                    <button type="submit" className="btn-submit-login" onClick={() => { navigate('/register') }}>Sign Up</button>
                </form>
            </div>
        </div>
    )
}
export default Login;