import { Router } from "express";
import { verifyToken } from "../middlewares/token.middleware";
import { getInboxes, viewUsers } from "../services/inbox.service";
import { sendMessage } from "../services/message.service";

export const messageRouter = Router();

messageRouter.use(verifyToken);

messageRouter.post("/sendMessage", (req, res, next) => {
  const { userId, message, inboxId } = req.body;
  sendMessage(userId, inboxId, message)
    .then((message) => {
      res.json({ data: message }).end();
    })
    .catch((err) => next(err));
});
