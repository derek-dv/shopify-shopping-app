import bcrypt from "bcrypt"
import { validationResult } from "express-validator";
import { resetPasswordValidator } from "../validators/user";

const resetPassword = [
  resetPasswordValidator,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ error: true, data: errors.array() });
      return;
    }
    try {
      const isValid = bcrypt.compareSync()
    } catch (err) {
      console.log(err.message);
    }
  },
];
