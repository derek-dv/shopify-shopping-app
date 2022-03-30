import { body } from "express-validator";

export const registerValidator = [
  body("name", "Name is required").exists({ checkFalsy: true }),
  body("email", "Email is required").exists({ checkFalsy: true }).isEmail(),
  body("password", "Password is required").exists({ checkFalsy: true }),
];

export const loginValidator = [
  body("email", "Email is required").exists({ checkFalsy: true }).isEmail(),
  body("password").exists({ checkFalsy: true }),
];

export const resetPasswordValidator = [
  body("oldPassword", "Old password must be provided").exists({
    checkFalsy: true,
  }),
  body("newPassword", "New password must be provided")
    .exists()
    .isStrongPassword({ minLength: 5 }),
  body("confirmPassword", "Confirm password must be provided").exists(),
];
