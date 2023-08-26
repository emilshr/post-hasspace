import { UserModel } from "../models/user.model";
import { comparePasswords, hashPassword, signToken } from "./password.service";

export const login = async (email: string, password: string) => {
  try {
    const user = await UserModel.findOne({ where: { email } });
    if (user) {
      const isPasswordValid = comparePasswords(password, user.hashedPassword);
      if (isPasswordValid) {
        const accessToken = signToken(email, user.id);
        return {
          userId: user.id,
          email,
          accessToken,
        };
      }
    }
    throw new Error("Invalid credentials");
  } catch (error) {
    console.error(`Error while logging in ... ${error}`);
    throw error;
  }
};

export const signUp = async (email: string, name: string, password: string) => {
  try {
    const user = await UserModel.findOne({ where: { email } });
    if (user) {
      throw new Error("duplicate user found");
    }
    const hashedPassword = hashPassword(password);
    const createdUser = await UserModel.create({
      email,
      name,
      hashedPassword,
    });
    return signToken(email, createdUser.id);
  } catch (error) {
    console.error(`Error while logging in ... ${error}`);
    throw error;
  }
};
