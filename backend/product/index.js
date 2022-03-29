import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
console.log(DB_USER, DB_PASSWORD);

mongoose
  .connect(`mongodb://product_mongodb`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.use("/api", productRouter);

    app.get("/", (req, res) => {
      res.send("products is ready");
    });

    const port = 6868// process.env.NODE_DOCKER_PORT || 5000;
    app.listen(port, () => {
      console.log(`listen at localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
