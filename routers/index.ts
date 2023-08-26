import { Router } from "express";
import { postRouter } from "./post.router";
import { authRouter } from "./auth.router";
import { verifyToken } from "../middlewares/token.middleware";

export const router = Router();

router.use("/auth", authRouter);
router.use("/post", [verifyToken], postRouter);
