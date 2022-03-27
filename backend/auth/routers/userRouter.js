import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import { generateToken } from "../utils";
import expressAsyncHandler from "express-async-handler";
import register from "../controllers/register";

const userRouter = express.Router();

userRouter.get("/seed", async (req, res) => {
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post("/register", register);

export default userRouter;
