import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("products is ready");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listen at localhost:${port}`);
});
