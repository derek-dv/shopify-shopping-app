import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import { generateToken } from "../utils";
import expressAsyncHandler from "express-async-handler";
import register from "../controllers/register";
import login from "../controllers/login";
import verifyJWT from "../controllers/verifyJWT";

const userRouter = express.Router();

userRouter.post("/signin", login);

userRouter.post("/register", register);

userRouter.get("/verifyJWT", verifyJWT);

export default userRouter;
