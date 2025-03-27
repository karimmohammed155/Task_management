import mongoose from "mongoose";
import { system_roles } from "../../src/utils/system_roles.utils.js";
const { model, Schema } = mongoose;

const user_schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(system_roles),
      default: "user",
    },
    image: {
      secure_url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
        unique: true,
      },
    },
    custom_id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const user = mongoose.models.user || model("user", user_schema);
