import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof Error) {
    res.status(500).json({ status: "Error", stack: err.message }).end();
  } else {
    next();
  }
};
