import { Router } from "express";
import { login, signUp } from "../services/auth.service";

export const authRouter = Router();

authRouter.post("/login", (req, res, next) => {
  login(req.body.username, req.body.password)
    .then((payload) => {
      res.json(payload);
    })
    .catch((err) => {
      next(err);
    });
});

authRouter.post("/signUp", (req, res, next) => {
  signUp(req.body.username, req.body.password)
    .then(() => {
      res.json({ message: "OK" }).end();
    })
    .catch((err) => {
      next(err);
    });
});
