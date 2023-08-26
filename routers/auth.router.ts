import { Router } from "express";
import { login, signUp } from "../services/auth.service";
import { zodSchemaBodyValidator } from "../middlewares/zod-schema-validator";
import z from "zod";

export const authRouter = Router();

authRouter.post(
  "/login",
  zodSchemaBodyValidator(
    z.strictObject({ email: z.string().email(), password: z.string().min(8) })
  ),
  (req, res, next) => {
    const { email, password } = req.body;
    login(email, password)
      .then((payload) => {
        res.json(payload);
      })
      .catch((err) => {
        next(err);
      });
  }
);

authRouter.post(
  "/signUp",
  zodSchemaBodyValidator(
    z.strictObject({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    })
  ),
  (req, res, next) => {
    const { email, name, password } = req.body;
    signUp(email, name, password)
      .then(() => {
        res.json({ message: "OK" }).end();
      })
      .catch((err) => {
        next(err);
      });
  }
);
