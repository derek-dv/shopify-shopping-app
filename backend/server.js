const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { productRouter } = require("./routers/productRouter.js");
const { userRouter } = require("./routers/userRouter.js");
const { orderRouter } = require("./routers/orderRouter.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/shopify", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listen at localhost:${port}`);
});
