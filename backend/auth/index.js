import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import helmet from "helmet";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect('mongodb://mongodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("User is ready");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listen at localhost:${port}`);
});
