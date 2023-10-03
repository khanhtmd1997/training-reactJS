const express = require("express");
const Model = require("../models/user.model");
// const ModelRole = require("../models/role.model");
// const ModelToken = require("../models/token.model");
const routes = express.Router();
const jwt = require("jsonwebtoken");

//Register User
routes.post("/register", async (req, res) => {
  console.log(req.body);
  const data = new Model({
    email: req.body?.email ?? "",
    password: req.body?.password ?? "",
    fullName: req.body?.fullName ?? "",
    phone: req.body?.phone ?? "",
    avatar: req.body?.avatar ?? "",
    address: req.body?.address ?? "",
    roleId: "",
    isAdmin: false,
  });

  try {
    const requiredValue = Object.keys(req.body).reduce((obj, item) => {
      if (item === "email" || item === "password" || item === "fullName") {
        if (req.body[item] === "") {
          obj[item] = `${item} không được bỏ trống`;
        }
      }
      return obj;
    }, {});

    if (Object.keys(requiredValue).length === 0) {
      const dataUsers = await Model.find();
      const filterUser = dataUsers.filter((el) => el.email === data.email);
      if (Object.keys(filterUser).length > 0) {
        res.status(400).json({ message: "Tài khoản đã tồn tại" });
      } else {
        const dataToSave = await data.save();
        if (dataToSave) {
          res.status(200).json({
            message: "Đăng ký tài khoản thành công",
            statusCode: 200,
          });
        } else {
          res.status(400).json({
            message: "Đăng ký tài khoản thất bại",
            statusCode: 400,
          });
        }
      }
    } else {
      res.status(200).json({
        statusCode: 422,
        data: requiredValue,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
});

//Login
routes.post("/login", async (req, res) => {
  const body = new Model({
    email: req.body.email ?? "",
    password: req.body.password ?? "",
  });

  try {
    const isValid = validForm(body, res);

    if (isValid) {
      const data = await Model.find();

      const findData = data.find(
        (el) => el.email === body.email && el.password === body.password
      );
      if (findData && findData.id) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
          time: Date(),
          userId: findData.id,
        };

        const token = jwt.sign(data, jwtSecretKey);
        // const modelToken = new ModelToken({
        //   token: token,
        //   userId: findData.id,
        // });
        // await modelToken.save();
        res.status(200).json({
          message: "Đăng nhập thành công",
          user: findData,
          token: token,
          statusCode: 200,
        });
      } else {
        res.status(400).json({
          message: `Tài khoản hoặc mật khẩu không đúng`,
          statusCode: 400,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
});

function validForm(body, res) {
  let isValid = true;
  if (body.email === "" && body.password === "") {
    res.status(200).json({
      statusCode: 422,
      data: {
        email: "email không được bỏ trống",
        password: "Mật khẩu không được bỏ trống",
      },
    });
    isValid = false;
  } else if (body.email === "") {
    res.status(200).json({
      statusCode: 422,
      data: {
        email: "Email không được bỏ trống",
      },
    });
    isValid = false;
  } else if (body.email === "") {
    res.status(200).json({
      statusCode: 422,
      data: {
        password: "Mật khẩu không được bỏ trống",
      },
    });
    isValid = false;
  } else {
    isValid = true;
  }
  return isValid;
}
module.exports = routes;
