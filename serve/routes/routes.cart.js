const express = require("express");
const ModelCart = require("../models/cart.model");
const ModelProduct = require("../models/product.model");

const routesCart = express.Router();
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
routesCart.get("/", async (req, res) => {
  var pageIndex = parseInt(req.query.pageIndex) || 0; //for next page pass 1 here
  var pageSize = parseInt(req.query.pageSize) || 20;
  const query = queryParams(req.query);
  try {
    if (req.headers.authorization) {
      await ModelCart.find(query)
        .sort({ update_at: -1 })
        .skip(pageIndex * pageSize) //Notice here
        .limit(pageSize)
        .exec((err, doc) => {
          if (err) {
            return res.json(err);
          }
          ModelCart.countDocuments(query).exec((count_error, count) => {
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
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

routesCart.get("/:id", async (req, res) => {
  try {
    if (req.headers.authorization) {
      const id = req.params.id;
      if (id) {
        const data = await ModelCart.findById(id);

        if (data) {
          res.status(200).json({
            statusCode: 200,
            data,
          });
        } else {
          res.status(400).json({
            statusCode: 400,
            message: "Không tìm thấy cart",
          });
        }
      } else {
        res.status(400).json({
          statusCode: 400,
          message: "Không tìm thấy cart",
        });
      }
    } else {
      res.status(401).json({ message: "Không có quyền", statusCode: 401 });
    }
  } catch (error) {
    res.status(500).json({ message: error.message + req.params });
  }
});

routesCart.post("/", async (req, res) => {
  try {
    if (req.headers.authorization) {
      const listProducts = await ModelProduct.find();
      const findProduct = listProducts.find(
        (el) => el.id === req.body?.productId
      );

      if (Object.keys(findProduct).length > 0) {
        const listCart = await ModelCart.find();
        const findCart =
          listCart.length &&
          listCart.find((el) => el.productId === req.body.productId);

        if (Object.keys(findCart).length > 0) {
          const data = {
            productId: findCart.id,
            price: findCart.price,
            quantity: req.body.quantity,
            total: (
              parseFloat(findProduct.price) * req.body.quantity
            ).toString(),
          };
          const id = findCart.id;

          const updatedData = data;
          const options = { new: true };
          const result = await ModelCart.findByIdAndUpdate(
            id,
            updatedData,
            options
          );
          res.send({
            data: result,
            statusCode: 200,
          });
        } else {
          const data = new ModelCart({
            productId: findProduct.id,
            price: findProduct.price,
            quantity: "1",
            total: findProduct.price.toString(),
          });
          await data.save();
          res.status(200).json({
            statusCode: 200,
            data: "Tạo mới cart thành công",
          });
        }
      } else {
        res
          .status(400)
          .json({ statusCode: 400, message: "Không tìm thấy product" });
      }
    } else {
      res.status(401).json({ message: "Không có quyền", statusCode: 401 });
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

//Delete by ID Method
routesCart.delete("/:id", async (req, res) => {
  try {
    if (req.headers.authorization) {
      const id = req.params.id;

      const data = await ModelCart.findByIdAndDelete(id);
      if (data) {
        res.send({
          message: "Xóa cart thành công",
          statusCode: 200,
        });
      } else {
        res.status(400).json({ statusCode: 400, message: error.message });
      }
    } else {
      res.status(401).json({ message: "Không có quyền", statusCode: 401 });
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

module.exports = routesCart;
