const express = require("express");
const Model = require("../models/role.model");
const routerRole = express.Router();

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

// {
//   "name": "Admin",
//   "description": "Quản trị",
//   "isActive": true,
//   "isAdmin": true,
// }

//Get all Method
routerRole.get("/", async (req, res) => {
  var pageIndex = parseInt(req.query.pageIndex) || 0; //for next page pass 1 here
  var pageSize = parseInt(req.query.pageSize) || 20;
  const query = queryParams(req.query);
  try {
    if (req.headers.authorization) {
      await Model.find(query)
        .sort({ update_at: -1 })
        .skip(pageIndex * pageSize) //Notice here
        .limit(pageSize)
        .exec((err, doc) => {
          if (err) {
            return res.json(err);
          }
          Model.countDocuments(query).exec((count_error, count) => {
            if (err) {
              return res.json(count_error);
            }
            return res.json({
              total: count,
              pageIndex,
              pageSize,
              data: doc,
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

//Get by ID Method
routerRole.get("/:id", async (req, res) => {
  try {
    if (req.headers.authorization) {
      const id = req.params.id;
      if (id) {
        const data = await Model.findById(id);

        res.status(200).json({
          statusCode: 200,
          data,
        });
      } else {
        res.status(400).json({
          statusCode: 400,
          message: "Không tìm thấy role",
        });
      }
    } else {
      res.status(401).json({ message: "Không có quyền", statusCode: 401 });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post Method
routerRole.post("/", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    description: req.body.description ? req.body.description : "",
    isActive: req.body.isActive ? req.body.isActive : false,
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
  });

  try {
    if (req.headers.authorization) {
      const requiredValue = Object.keys(req.body).reduce((obj, item) => {
        if (item === "name") {
          if (req.body[item] === "") {
            obj[item] = `${item} không được bỏ trống`;
          }
        }
        return obj;
      }, {});
      if (Object.keys(requiredValue).length === 0) {
        await data.save();
        res.status(200).json({
          statusCode: 200,
          data: "Tạo mới role thành công",
        });
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

//Update by ID Method
routerRole.put("/:id", async (req, res) => {
  try {
    if (req.headers.authorization) {
      const requiredValue = Object.keys(req.body).reduce((obj, item) => {
        if (item === "name") {
          if (req.body[item] === "") {
            obj[item] = `${item} không được bỏ trống`;
          }
        }
        return obj;
      }, {});
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
      if (Object.keys(requiredValue).length === 0) {
        await Model.findByIdAndUpdate(id, updatedData, options);

        res.send({ message: "Thay đổi role thành công", statusCode: 200 });
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

//Delete by ID Method
routerRole.delete("/:id", async (req, res) => {
  try {
    if (req.headers.authorization) {
      const id = req.params.id;
      const data = await Model.findByIdAndDelete(id);
      if (data) {
        res.send({
          message: "Xóa role thành công",
          statusCode: 200,
        });
      } else {
        res.status(400).json({ statusCode: 400, message: error.message });
      }
    } else {
      res.status(401).json({ message: "Không có quyền", statusCode: 401 });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = routerRole;
