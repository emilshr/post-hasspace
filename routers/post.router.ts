import z from "zod";
import { Router } from "express";
import {
  zodSchemaBodyValidator,
  zodSchemaParamsValidator,
} from "../middlewares/zod-schema-validator";

export const postRouter = Router();

/**
 * @description To fetch a list of all blog posts
 */
postRouter.get("/", async () => {});

/**
 * @description Fetch a specific blog post by its ID
 */
postRouter.get(
  "/:postId",
  zodSchemaParamsValidator(z.strictObject({ postId: z.string() })),
  async () => {}
);

/**
 * @description Create a new blog post
 */
postRouter.post(
  "/",
  zodSchemaBodyValidator(
    z.strictObject({
      title: z.string(),
      content: z.string().optional(),
    })
  ),
  async (req, res) => {
    res.send(req.body);
  }
);

/**
 * @description Update an existing blog post
 */
postRouter.put(
  "/:postId",
  zodSchemaParamsValidator(z.strictObject({ postId: z.string() })),
  async (req, res) => {
    console.log(req.params, req.query);
    res.sendStatus(200);
  }
);

/**
 * @description Delete a blog post
 */
postRouter.delete(
  "/:postId",
  zodSchemaParamsValidator(z.strictObject({ postId: z.string() })),
  async () => {}
);
