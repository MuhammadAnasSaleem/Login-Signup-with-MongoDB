import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // owner/todoAddBy: { type: Schema.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
