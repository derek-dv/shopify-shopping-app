import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { loginValidator } from "../validators/user";
import User from "../models/userModel";
import { generateToken } from "../utils";

const login = [
  loginValidator,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      res.status(422).json({ error: true, data: errors.array() });
    else {
      const exists = await User.exists({ email: req.body.email });
      if (!exists) {
        res.status(401).json({
          error: true,
          data: { message: "Invalid email or password" },
        });
      } else {
        const user = await User.findOne({ email: req.body.email });
        const valid = bcrypt.compareSync(req.body.password, user.password);
        if (!valid) {
          res.status(401).json({
            error: true,
            data: { message: "Invalid email or password" },
          });
          return;
        }
        res.json({
          error: false,
          email: user.email,
          name: user.name,
          jwtToken: generateToken(user),
        });
      }
    }
  },
];

export default login;
