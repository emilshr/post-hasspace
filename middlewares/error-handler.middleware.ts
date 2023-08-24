import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    res.status(500).json({ status: "Error", stack: err.stack }).end();
  } else {
    next();
  }
};
