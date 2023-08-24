import { Request, Router } from "express";
import { verifyToken } from "../middlewares/token.middleware";
import {
  createInbox,
  getInboxMetaData,
  getInboxes,
  getRequestCount,
  respondToInbox,
  viewUsers,
} from "../services/inbox.service";
import { fetchMessages } from "../services/message.service";
import { InboxParticipantStatus } from "../models/schema";

export const inboxRouter = Router();

inboxRouter.use(verifyToken);

inboxRouter.get(
  "/getInboxes",
  (
    req: Request<
      {},
      {},
      { userId: string },
      { inboxStatus?: InboxParticipantStatus }
    >,
    res,
    next
  ) => {
    console.log("params", req.params, req.query);
    getInboxes(req.body.userId, req.query.inboxStatus)
      .then((inboxes) => {
        res.json({ data: inboxes }).end();
      })
      .catch((err) => next(err));
  }
);

inboxRouter.get("/viewUsers", (req, res, next) => {
  viewUsers(req.body.userId)
    .then((users) => {
      res.json({ data: users }).end();
    })
    .catch((err) => next(err));
});

inboxRouter.post("/createInbox", (req, res, next) => {
  createInbox(
    req.body.userId,
    req.body.participatingUserIds,
    req.body.inboxName
  )
    .then((createdInbox) => {
      res.json({ data: createdInbox }).end();
    })
    .catch((err) => next(err));
});

inboxRouter.post("/viewInbox", (req, res, next) => {
  fetchMessages(req.body.inboxId)
    .then((messages) => {
      res.json({ data: messages }).end();
    })
    .catch((err) => next(err));
});

inboxRouter.get("/getInboxMetaData", (req, res, next) => {
  getInboxMetaData(req.body.userId, req.query["inboxId"] as string)
    .then((user) => {
      res.json({ data: user }).end();
    })
    .catch((err) => next(err));
});

inboxRouter.get("/getRequestCount", (req, res, next) => {
  getRequestCount(req.body.userId)
    .then((count) => {
      res.json({ data: count }).end();
    })
    .catch((err) => next(err));
});

inboxRouter.post("/respondToInbox", (req, res, next) => {
  respondToInbox(req.body.inboxStatus, req.body.inboxId, req.body.userId)
    .then((response) => {
      res.json({ data: response }).end();
    })
    .catch((err) => next(err));
});
