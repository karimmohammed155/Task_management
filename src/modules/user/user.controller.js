import { nanoid } from "nanoid";
import { user } from "../../../Database/models/user.model.js";
import { Error_handler_class } from "../../utils/error-class.utils.js";
import { compareSync, hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { cloudinary_config } from "../../utils/cloudinary.utils.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const email_exists = await user.findOne({ email });
  if (email_exists) {
    return next(
      new Error_handler_class("email is already exists", 400, "register api")
    );
  }
  const hashed_password = hashSync(password, +process.env.SALT_ROUNDS);
  // image
  if (!req.file) {
    next(
      new Error_handler_class(
        "please upload an image",
        400,
        "please upload an image"
      )
    );
  }
  // upload image to cloudinary
  const custom_id = nanoid(4);
  const { secure_url, public_id } = await cloudinary_config().uploader.upload(
    req.file.path,
    {
      folder: `${process.env.UPLOADS_FOLDER}/users/${custom_id}`,
    }
  );
  const user_object = {
    name,
    email,
    password: hashed_password,
    image: {
      secure_url: secure_url,
      public_id: public_id,
    },
    custom_id: custom_id,
  };
  const new_user = await user.create(user_object);
  res
    .status(201)
    .json({ message: "user added successfully", data: new_user._id });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user_found = await user.findOne({ email });
  if (!user_found) {
    return next(
      new Error_handler_class("invalid credentials", 400, "login api")
    );
  }
  const pass_match = compareSync(password, user_found.password);
  if (!pass_match) {
    return next(
      new Error_handler_class("invalid credentials", 400, "login api")
    );
  }
  const token = jwt.sign({ user_id: user_found._id }, process.env.JWT_SECRET);
  res
    .status(200)
    .json({ message: "user logged in successfully", token: token });
};
