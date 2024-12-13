import mongoose, { Schema, model } from "mongoose";

export interface UserDocument {
  _id: string;
  email: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  timeZone: string;
  hardinessZone: string;
  "setup.setupCompleted": boolean;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    image: {
      type: String,
    },
    timeZone: {
      type: String,
    },
    hardinessZone: {
      type: String,
    },
    "setup.setupCompleted": {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<UserDocument>("User", UserSchema);
export default User;
