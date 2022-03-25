import express from "express";
import download from "../lib/download";
import awsUpload, { multerUpload } from "../lib/upload";
import Product from "../models/productModel";
import { isAuth } from "../utils.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

//GEt product image
productRouter.get("/image/:key", async (req, res) => {
  const key = req.params.key;
  const readStream = download(key);

  readStream.pipe(res);
});

//New product
productRouter.post(
  "/",
  [isAuth, multerUpload.single("img")],
  async (req, res) => {
    console.log(req.body.name);
    console.log(req.file);
    const {
      name,
      category,
      price,
      countInStock,
      brand,
      description,
      authorId,
    } = req.body;
    if (
      name &&
      category &&
      price &&
      countInStock &&
      brand &&
      description &&
      authorId
    ) {
      try {
        const result = await awsUpload(req.file);
        const image = { url: `/image/${result.Key}`, key: result.Key };
        const product = new Product({
          name,
          category,
          price,
          countInStock,
          brand,
          description,
          authorId,
          rating: "0",
          numReviews: "0",
          image: [image],
        });
        const newProduct = await product.save();
        res.status(201).json({ error: false, data: { product: newProduct } });
      } catch (err) {
        console.log(err);
      }
    } else res.status(400).json({ error: true });
  }
);

productRouter.put("/:id", isAuth, async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const temp = await Product.findById(id);

  if (temp) {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name: body.name || temp.name,
        category: body.category || temp.category,
        price: body.price || temp.price,
        description: body.description || temp.description,
        countInStock: body.countInStock || temp.countInStock,
        brand: body.brand || temp.brand,
        rating: body.rating || temp.rating,
        numReviews: body.numReviews || temp.numReviews,
      },
      { new: true }
    );

    res.status(200).json({ error: false, data: { product } });
  } else
    res
      .status(401)
      .json({ error: true, data: { message: "Product with ID not found" } });
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

//delete by ID

productRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
});

export default productRouter;
