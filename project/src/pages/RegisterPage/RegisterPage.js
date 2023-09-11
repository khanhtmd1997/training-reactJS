import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './RegisterPage.css';

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

const isPhoneValid = (phone) => {
    return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone);
}

const RegisterPage = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        fullName: ""
    });

    const [object, setObject] = useState({
        email: "",
        password: "",
        fullName: "",
        phone: "",
        avatar: "",
        address: ""
    });

    const [formError, setFormError] = useState({});
    // validate the form input values and update the formError
    const validateForm = (object, name) => {
        const error = {};
        console.log(123, object, name);

        if (name === 'email') {
            if (isEmptyValue(object)) {
                error["email"] = "Email is required";
            } else {
                if (!isEmailValid(object)) {
                    error["email"] = "Please enter a valid email format";
                }
            }
        } else if (name === 'password') {
            if (isEmptyValue(object)) {
                error["password"] = "Password is required";
            } else {
                if (isPasswordValid(object)) {
                    error["password"] = "Password must be at least 8 characters";
                }
            }
        } else if (name === 'fullName') {
            if (isEmptyValue(object)) {
                error["fullName"] = "Full name is required";
            }
        } else if (name === 'phone') {
            if (!isPhoneValid(object)) {
                error["phone"] = "Please enter a valid phone format";
            }
        }
        setFormError(error);
        return Object.keys(error).length === 0;
    }

    const onChange = (event) => {
        const { value, name } = event.target;
        console.log(object);
        setObject({
            ...object,
            [name]: value
        });
        validateForm(value, name);
    }

    //
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(object);
        const response = await axios({
            url: "http://localhost:8080/api/register",
            method: "POST",
            data: object
        })
            .then(response => {
                if (response.data.statusCode === 200) {
                    navigate('/login');
                } else
                    if (response.data.statusCode === 422) {
                        let errorMessages = "";
                        const validate = {
                            email: "",
                            password: "",
                            fullName: ""
                        }

                        response.data.data.forEach(error => {
                            validate[error.key] = error.value;
                            errorMessages += `${error.key}: ` + `${error.value}\n`;
                        });
                        console.log(validate);
                        setErrors(
                            validate
                        );
                        alert(errorMessages);
                    }
            })
            .catch(error => {
                console.log(error);
                alert(JSON.stringify(error.response.data || error.response.data?.message));
            })
    }
    return (
        // <form className="form-register" onSubmit={onSubmit}>
        //     <input placeholder="email" name="email" onChange={onChange} />
        //     <input placeholder="password" name="password" onChange={onChange} />
        //     <input placeholder="fullName" name="fullName" onChange={onChange} />
        //     <button type="submit">submit</button>
        // </form>    

        <div className="register-page">
            <div className="register-form-container">
                <h1 className="title">Register</h1>
                <div className="logo-container mb-16">
                    <img className="logo" src="https://one.3si.vn/one3s_web/static/src/img/logo-3s-horizontal.png" alt="logo-3S" />
                </div>

                <form onSubmit={onSubmit}>
                    <div className="mb-16">
                        <label htmlFor="email" className="form-label mb-8">
                            Email
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="email"
                            onChange={onChange}
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
                            className="form-control"
                            type="password"
                            name="password"
                            onChange={onChange}
                        />

                        {formError.password && (
                            <div className="error-feedback">{formError.password}</div>
                        )}
                    </div>

                    <div className="mb-16">
                        <label htmlFor="fullName" className="form-label mb-8">
                            Full Name
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="fullName"
                            onChange={onChange}
                        />
                        {formError.fullName && (
                            <div className="error-feedback">{formError.fullName}</div>
                        )}
                    </div>
                    <div className="row">
                        <div className="mb-16 row-space">
                            <label htmlFor="phone" className="form-label mb-8">
                                Phone
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                name="phone"
                                onChange={onChange}
                            />
                            {formError.phone && (
                                <div className="error-feedback">{formError.phone}</div>
                            )}
                        </div>

                        <div className="mb-16 row-space">
                            <label htmlFor="avatar" className="form-label mb-8">
                                Avatar
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                name="avatar"
                                onChange={onChange}
                            />
                        </div>
                    </div>


                    <div className="mb-16">
                        <label htmlFor="address" className="form-label mb-8">
                            Address
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="address"
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit" className="btn-submit-login">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;