import { UserModel } from "../models/schema";
import { comparePasswords, hashPassword, signToken } from "./password.service";

export const login = async (username: string, password: string) => {
  try {
    const user = await UserModel.findOne({ where: { username } });
    if (user) {
      const isPasswordValid = comparePasswords(
        password,
        user.dataValues.hashedPassword
      );
      if (isPasswordValid) {
        const accessToken = signToken(username, user.dataValues.userId);
        return {
          userId: user.dataValues.userId,
          username,
          accessToken,
        };
      }
    }
    throw new Error("invalid login");
  } catch (error) {
    console.error(`Error while logging in ... ${error}`);
    throw error;
  }
};

export const signUp = async (username: string, password: string) => {
  try {
    const user = await UserModel.findOne({ where: { username } });
    if (user) {
      throw new Error("duplicate user found");
    }
    const hashedPassword = hashPassword(password);
    const createdUser = await UserModel.create({ username, hashedPassword });
    return !!createdUser;
  } catch (error) {
    console.error(`Error while logging in ... ${error}`);
    throw error;
  }
};
