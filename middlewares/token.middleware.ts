import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const verifyToken: RequestHandler = (req, _res, next) => {
  let token = req.headers["x-access-token"];

  if (!token || Array.isArray(token)) {
    throw new Error("unauthorized");
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        throw new Error("unauthorized");
      }
      const { userId, email } = decoded as {
        email: string;
        userId: string;
      };
      console.log({ decoded });
      req.body.userId = userId;
      req.body.email = email;
      next();
    });
  }
};
