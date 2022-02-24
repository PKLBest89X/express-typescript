import { Schema, model } from "mongoose";
import { ReactUserType } from "types/reactUser.types";

const reactUserSchema = new Schema<ReactUserType>(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<ReactUserType>("ReactUser", reactUserSchema);
