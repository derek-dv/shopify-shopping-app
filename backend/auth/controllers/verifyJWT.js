import { isAuth } from "../utils";

const verifyJWT = [
  isAuth,
  async (req, res) => {
    console.log(req.user);
    res.send(req.user);
  },
];

export default verifyJWT