import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { registerValidator } from "../validators/user";
import User from "../models/userModel";

const register = [
  registerValidator,
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty())
      res.status(422).json({ error: true, data: errors.array() });
    else {
      const exists = await User.exists({ email: req.body.email });
      if (exists) {
        res
          .status(400)
          .json({ error: true, data: { message: "User with email exists" } });
      } else {
        const user = new User({
          email: req.body.email,
          name: req.body.name,
          password: bcrypt.hashSync(req.body.password, 8),
        });

        await user.save();

        res.status(201).json({ error: false, data: { user } });
      }
    }
  },
];

export default register;
