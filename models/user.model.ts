import { Schema, model } from "mongoose";

export interface User {
  name: string;
  email: string;
  hashedPassword: string;
  age: number;
}

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

export const UserModel = model("User", UserSchema);
