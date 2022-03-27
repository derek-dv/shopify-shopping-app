import { body } from "express-validator";

export const registerValidator = [
  body("name", "Name is required").exists({ checkFalsy: true }),
  body("email", "Email is required").exists({ checkFalsy: true }).isEmail(),
  body("password", "Password is required").exists({ checkFalsy: true  }),
];
