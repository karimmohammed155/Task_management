import jwt from "jsonwebtoken";
import { user } from "../../Database/models/user.model.js";

export const auth = () => {
  return async (req, res, next) => {
    // get token from header
    const { token } = req.headers;
    if (!token) {
      return res
        .status(400)
        .json({ message: "please sign in first , no token generated" });
    }
    // bearer token
    if (!token.startsWith("noteApp")) {
      return res.status(400).json("invalid token");
    }
    const original_token = token.split(" ")[1];
    // decode
    const decoded_data = jwt.verify(original_token, "tokenSignature");
    if (!decoded_data?.user_id) {
      return res.status(400).json("invalid token payload");
    }
    // find user_id
    const User = await user
      .findById(decoded_data.user_id)
      .select("-password");
    if (!User) {
      return res
        .status(400)
        .json({ message: "please sign up and try to log in" });
    }
    req.authUser = User;
    next();
  };
};
