import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const comparePasswords = (password: string, toBeCompared: string) => {
  return bcrypt.compareSync(password, toBeCompared);
};

export const signToken = (email: string, userId: string) => {
  return jwt.sign({ email, userId }, config.secret, { expiresIn: "10d" });
};

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};
