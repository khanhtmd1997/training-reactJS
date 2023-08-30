const express = require("express");
const ModelUser = require("../models/user.model");
const ModelRole = require("../models/role.model");
const ModelToken = require("../models/token.model");
const routerUser = express.Router();
const jwt = require("jsonwebtoken");

function queryParams(query) {
  let filter = {};
  Object.keys(query).forEach((el) => {
    if (el === "pageIndex" || el === "pageSize") return;
    else {
      if (query[el] !== "" && query[el] !== undefined && query[el] !== null) {
        filter = {
          ...filter,
          [`${el}`]: query[el],
        };
      }
    }
  });

  return filter;
}

routerUser.get("/", async (req, res) => {
  var pageIndex = parseInt(req.query.pageIndex) || 0; //for next page pass 1 here
  var pageSize = parseInt(req.query.pageSize) || 20;
  const query = queryParams(req.query);
  try {
    if (req.headers.authorization) {
      await ModelUser.find(query)
        .sort({ update_at: -1 })
        .skip(pageIndex * pageSize) //Notice here
        .limit(pageSize)
        .exec((err, doc) => {
          if (err) {
            return res.json(err);
          }
          ModelUser.countDocuments(query).exec((count_error, count) => {
            if (err) {
              return res.json({
                statusCode: 400,
                message: count_error,
              });
            }
            return res.json({
              total: count,
              pageIndex,
              pageSize,
              data: doc,
              statusCode: 200,
            });
          });
        });
    } else {
      res.status(401).json({ message: "Không có quyền", statusCode: 401 });
    }
  } catch (error) {
    res.status(500).json({ message: error.message + req.params });
  }
});

routerUser.get("/:id", async (req, res) => {
  try {
    if (req.headers.authorization) {
      const id = req.params.id;
      if (id) {
        const data = await ModelUser.findById(id);

        res.status(200).json({
          statusCode: 200,
          data,
        });
      } else {
        res.status(400).json({
          statusCode: 400,
          message: "Không tìm thấy user",
        });
      }
    } else {
      res.status(401).json({ message: "Không có quyền", statusCode: 401 });
    }
  } catch (error) {
    res.status(500).json({ message: error.message + req.params });
  }
});

// {
//   "username": "khanhtmd",
//   "password": "Khanh@123",
//   "fullname": "Nguyễn Văn Khánh",
//   "phone": "0364606406",
//   "avatar": "",
//   "address": ""
//   "roleId": 1
// }

//Post Method
routerUser.post("/", async (req, res) => {
  let data = new ModelUser({
    email: req.body?.email ?? "",
    password: req.body?.password ?? "",
    fullName: req.body?.fullName ?? "",
    roleId: req.body?.roleId ?? "",
    phone: req.body?.phone ?? "",
    avatar: req.body?.avatar ?? "",
    address: req.body?.address ?? "",
    isAdmin: false,
  });
  try {
    if (req.headers.authorization) {
      const requiredValue = Object.keys(req.body).reduce((obj, item) => {
        if (
          item === "name" ||
          item === "password" ||
          item === "fullName" ||
          item === "roleId"
        ) {
          if (req.body[item] === "") {
            obj[item] = `${item} không được bỏ trống`;
          }
        }
        return obj;
      }, {});
      if (Object.keys(requiredValue).length === 0) {
        const dataUsers = await ModelUser.find();
        const filterUser = dataUsers.filter(
          (el) => el.username === req.body.email
        );
        if (Object.keys(filterUser).length > 0) {
          res.status(400).json({ message: "Tài khoản đã tồn tại" });
        } else {
          const dataRole = await ModelRole.find();
          const findRole = dataRole.find(
            (el) => el._id.toString() === data.roleId
          );
          if (findRole) {
            if (findRole.isActive) {
              data.isAdmin = findRole.isAdmin;
              await data.save();
              res.status(200).json({
                statusCode: 200,
                message: "Tạo mới user thành công",
              });
            } else {
              res.status(400).json({ message: "Role chưa được kích hoạt" });
            }
          } else {
            res.status(400).json({ message: "Không tìm thấy role" });
          }
        }
      } else {
        res.status(200).json({
          statusCode: 422,
          data: requiredValue,
        });
      }
    } else {
      res.status(401).json({ message: "Không có quyền", statusCode: 401 });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

routerUser.put("/change-password", async (req, res) => {
  try {
    if (req.headers.authorization) {
      const requiredValue = Object.keys(req.body).reduce((obj, item) => {
        if (item === "password" || item === "confirmPassword") {
          if (req.body[item] === "") {
            obj[item] = `${item} không được bỏ trống`;
          }
        }
        return obj;
      }, {});
      if (Object.keys(requiredValue).length === 0) {
        const user = await ModelUser.findById(req.body.id);
        if (user) {
          if (req.body.password === req.body.confirmPassword) {
            const updatedData = {
              password: req.body.password,
            };
            const options = { new: true };
            await ModelUser.findByIdAndUpdate(
              req.body.id,
              updatedData,
              options
            );

            res.send({
              message: "Thay đổi mật khẩu thành công",
              statusCode: 200,
            });
          } else {
            res.status(400).json({
              message: "Xác nhận mật khẩu không trùng với mật khẩu mới",
            });
          }
        } else {
          res.status(400).json({ message: "Không tìm thấy user" });
        }
      } else {
        res.status(200).json({
          statusCode: 422,
          data: requiredValue,
        });
      }
    } else {
      res.status(401).json({ message: "Không có quyền", statusCode: 401 });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Update by ID Method
routerUser.put("/:id", async (req, res) => {
  let data = {
    email: req.body?.email ?? "",
    password: req.body?.password ?? "",
    fullName: req.body?.fullName ?? "",
    roleId: req.body?.roleId ?? "",
    phone: req.body?.phone ?? "",
    avatar: req.body?.avatar ?? "",
    address: req.body?.address ?? "",
    isAdmin: false,
  };
  try {
    if (req.headers.authorization) {
      const requiredValue = Object.keys(req.body).reduce((obj, item) => {
        if (
          item === "name" ||
          item === "password" ||
          item === "fullName" ||
          item === "roleId"
        ) {
          if (req.body[item] === "") {
            obj[item] = `${item} không được bỏ trống`;
          }
        }
        return obj;
      }, {});
      if (Object.keys(requiredValue).length === 0) {
        const dataRole = await ModelRole.find();
        const findRole = dataRole.find(
          (el) => el._id.toString() === data.roleId
        );
        if (findRole) {
          if (findRole.isActive) {
            data.isAdmin = findRole.isAdmin;
            const id = req.params.id;
            const updatedData = req.body;
            const options = { new: true };
            await ModelUser.findByIdAndUpdate(id, updatedData, options);

            res.send({
              message: "Thay đổi tài khoản thành công",
              statusCode: 200,
            });
          } else {
            res
              .status(400)
              .json({ message: "Role chưa được active, vui lòng active role" });
          }
        } else {
          res.status(400).json({ message: "Role không được bỏ trống" });
        }
      } else {
        res.status(200).json({
          statusCode: 422,
          data: requiredValue,
        });
      }
    } else {
      res.status(401).json({ message: "Không có quyền", statusCode: 401 });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerUser.delete("/:id", async (req, res) => {
  try {
    if (req.headers.authorization) {
      const id = req.params.id;

      const data = await ModelUser.findByIdAndDelete(id);
      if (data) {
        res.send({
          message: "Xóa user thành công",
          statusCode: 200,
        });
      } else {
        res
          .status(400)
          .json({ statusCode: 400, message: "Không tìm thấy user" });
      }
    } else {
      res.status(401).json({ message: "Không có quyền", statusCode: 401 });
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

module.exports = routerUser;
