const express = require("express");
const ModelCategory = require("../models/category.model");
const ModelProduct = require("../models/product.model");
const ModelCategoryChild = require("../models/categoryChild.model");
const routesCategories = express.Router();

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
routesCategories.get("/", async (req, res) => {
  var pageIndex = parseInt(req.query.pageIndex) || 0; //for next page pass 1 here
  var pageSize = parseInt(req.query.pageSize) || 20;
  const query = queryParams(req.query);
  try {
    await ModelCategory.find(query)
      .sort({ update_at: -1 })
      .skip(pageIndex * pageSize) //Notice here
      .limit(pageSize)
      .exec((err, doc) => {
        if (err) {
          return res.json(err);
        }
        ModelCategory.countDocuments(query).exec(async (count_error, count) => {
          if (err) {
            return res.json(count_error);
          }
          const dataChild = await ModelCategoryChild.find();
          const data = [...doc];
          data.forEach((el) => {
            dataChild.forEach((child) => {
              if (child.categoryId === el._id.toString()) {
                el.children.push({
                  // categoryId: child.categoryId,
                  name: child.name,
                  isActive: child.isActive,
                });
              }
            });
          });
          return res.json({
            total: count,
            pageIndex,
            pageSize,
            data: doc,
          });
        });
      });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

routesCategories.get("/:id", async (req, res) => {
  try {
    if (req.headers.authorization) {
      const id = req.params.id;
      if (id) {
        const data = await ModelCategory.findById(id);

        if (data) {
          res.status(200).json({
            statusCode: 200,
            data,
          });
        } else {
          res.status(400).json({
            statusCode: 400,
            message: "Không tìm thấy category",
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

routesCategories.post("/", async (req, res) => {
  let data = new ModelCategory({
    category: req.body.category,
    description: req.body.description,
    isActive: req.body?.isActive ?? false,
  });
  try {
    if (req.headers.authorization) {
      const requiredValue = Object.keys(req.body).reduce((obj, item) => {
        if (item === "category" || item === "description") {
          if (req.body[item] === "" && typeof req.body[item] !== "boolean") {
            obj[item] = `${item} không được bỏ trống`;
          }
        }
        return obj;
      }, {});

      if (Object.keys(requiredValue).length === 0) {
        await data.save();
        res.status(200).json({
          statusCode: 200,
          data: "Tạo mới category thành công",
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

routesCategories.put("/:id", async (req, res) => {
  let data = {
    category: req.body.category,
    description: req.body.description,
    isActive: req.body.isActive ?? false,
  };
  try {
    if (req.headers.authorization) {
      const requiredValue = Object.keys(req.body).reduce((obj, item) => {
        if (item === "category" || item === "description") {
          if (req.body[item] === "") {
            obj[item] = `${item} không được bỏ trống`;
          }
          return obj;
        }
      }, {});

      const id = req.params.id;

      if (Object.keys(requiredValue).length === 0) {
        const dataCategory = await ModelCategory.find();
        const findCategory = dataCategory.find((el) => el.id === id);
        if (Object.keys(findCategory).length === 0) {
          res
            .status(400)
            .json({ statusCode: 400, message: "Category không tồn tại" });
        } else {
          const updatedData = data;
          const options = { new: true };
          const result = await ModelCategory.findByIdAndUpdate(
            id,
            updatedData,
            options
          );

          res.send({
            data: result,
            statusCode: 200,
          });
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
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

//Delete by ID Method
routesCategories.delete("/:id", async (req, res) => {
  try {
    if (req.headers.authorization) {
      const id = req.params.id;
      const listProduct = await ModelProduct.find(req.query ? req.query : null);
      const findId = listProduct.find((el) => el.categoryId === id);
      if (Object.keys(findId).length > 0) {
        res.status(400).json({
          statusCode: 400,
          message:
            "Không thể xóa category vì product đang sử dụng category này, Vui lòng xóa product trước khi xóa category",
        });
      } else {
        const data = await ModelCategory.findByIdAndDelete(id);
        if (data) {
          res.send({
            message: "Xóa category thành công",
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

module.exports = routesCategories;
