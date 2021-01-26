const express = require("express");
const { data } = require("../data");
const { Product } = require("../models/productModel");

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});
productRouter.get("/seed", async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

module.exports.productRouter = productRouter;
