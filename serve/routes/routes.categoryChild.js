const express = require("express");
const ModelCategory = require("../models/category.model");
const ModelCategoryChild = require("../models/categoryChild.model");
const ModelProduct = require("../models/product.model");
const routesCategoryChild = express.Router();
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

//Get all Method
routesCategoryChild.get("/", async (req, res) => {
  const query = queryParams(req.query);
  try {
    const data = [];
    const listChild = await ModelCategoryChild.find();
    listChild.forEach((el) => {
      if (el.categoryId === query["categoryId"]) {
        data.push(el);
      }
    });

    res.status(200).json({
      statusCode: 200,
      data,
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

routesCategoryChild.get("/:id", async (req, res) => {
  try {
    if (req.headers.authorization) {
      const id = req.params.id;
      if (id) {
        const data = await ModelCategoryChild.findById(id);

        if (data) {
          res.status(200).json({
            statusCode: 200,
            data,
          });
        } else {
          res.status(400).json({
            statusCode: 400,
            message: "Không tìm thấy category child",
          });
        }
      } else {
        res.status(400).json({
          statusCode: 400,
          message: "Không tìm thấy category",
        });
      }
    } else {
      res.status(401).json({ message: "Không có quyền", statusCode: 401 });
    }
  } catch (error) {
    res.status(500).json({ message: error.message + req.params });
  }
});

routesCategoryChild.post("/", async (req, res) => {
  let data = new ModelCategoryChild({
    categoryId: req.body.categoryId,
    name: req.body.name,
    isActive: req.body.isActive ?? false,
  });
  try {
    if (req.headers.authorization) {
      const requiredValue = Object.keys(req.body).reduce((obj, item) => {
        if (item === "categoryId" || item === "name") {
          if (req.body[item] === "") {
            obj[item] = `${item} không được bỏ trống`;
          }
        }
        return obj;
      }, {});
      if (Object.keys(requiredValue).length === 0) {
        const list = await data.save();
        res.status(200).json({
          statusCode: 200,
          data: "Tạo mới category child thành công",
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
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

routesCategoryChild.put("/:id", async (req, res) => {
  let data = {
    categoryId: req.body.categoryId,
    name: req.body.name,
    isActive: req.body.isActive ?? false,
  };
  try {
    if (req.headers.authorization) {
      const requiredValue = Object.keys(data).reduce((obj, item) => {
        if (item === "categoryId" || item === "name") {
          if (req.body[item] === "") {
            obj[item] = `${item} không được bỏ trống`;
          }
        }
        return obj;
      }, {});
      if (Object.keys(requiredValue).length === 0) {
        const list = await data.save();
        res.status(200).json({
          statusCode: 200,
          data: "Tạo mới category child thành công",
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
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

//Delete by ID Method
routesCategoryChild.delete("/:id", async (req, res) => {
  try {
    if (req.headers.authorization) {
      const listProduct = await ModelProduct.find(req.query ? req.query : null);
      const findId = listProduct.find((el) => el.categoryId === id);

      if (Object.keys(findId).length > 0) {
        res.status(400).json({
          statusCode: 400,
          message:
            "Không thể xóa category child vì product đang sử dụng category child này, Vui lòng xóa product trước khi xóa category",
        });
      } else {
        const id = req.params.id;
        const data = await ModelCategoryChild.findByIdAndDelete(id);
        if (data) {
          res.send({
            message: "Xóa category child thành công",
            statusCode: 200,
          });
        } else {
          res.status(400).json({ statusCode: 400, message: error.message });
        }
      }
    } else {
      res.status(401).json({ message: "Không có quyền", statusCode: 401 });
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

module.exports = routesCategoryChild;
