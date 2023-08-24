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
      const { userId, username } = decoded as {
        username: string;
        userId: string;
      };
      req.body.userId = userId;
      req.body.username = username;
      next();
    });
  }
};
