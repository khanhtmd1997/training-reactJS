import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Register.css';
const RegisterPage = () => {    
const navigate = useNavigate();   

const [object, setObject] = useState({
  email: "",
  password: "", 
  fullName:"" 
});
const [errors, setErrors] = useState({
  email: "",
  password: "",
  fullName: ""
}); 

const onChange = (event) => {   
      const { value, name } = event.target;   
      console.log(object);    
    setObject({            
    ...object,           
     [name]: value 
    })    
  }    

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
                              errorMessages += `${error.key}:`  + `${error.value}\n`;
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

   <div className="register">
      <div className="form_register">
        <h2>Đăng kí</h2>
        <form  onSubmit={onSubmit}>
          <div className="form-sign">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              onChange={onChange}/> 
          </div>
          <div className="form-sign">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={onChange} />
          </div>
          <div className="form-sign">
            <label htmlFor="fullName">FullName</label>
            <input
              type="fullName"
              onChange={onChange} />
          </div>
          <div className="form-sign">
            <label htmlFor="phone">Phone</label>
            <input
              type="phone"
              onChange={onChange} />
          </div>
          <div className="form-sign">
            <label htmlFor="avatar">Avatar</label>
            <input
              type="avatar"
              onChange={onChange} />
          </div>
          <div className="form-sign">
            <label htmlFor="address">Address</label>
            <input
              type="address"
              onChange={onChange} />
          </div>
          <button onClick= {onSubmit} type="submit">Đăng kí</button>
        </form>
      </div>
    </div>
  );
};
   export default RegisterPage;
