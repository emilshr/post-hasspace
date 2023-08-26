import z from "zod";
import { Router } from "express";
import {
  zodSchemaBodyValidator,
  zodSchemaParamsValidator,
  zodSchemaQueryParamsValidator,
} from "../middlewares/zod-schema-validator";
import {
  createNewPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from "../services/post.service";

export const postRouter = Router();

/**
 * @description To fetch a list of all blog posts
 */
postRouter.get(
  "/",
  zodSchemaQueryParamsValidator(
    z.strictObject({
      skip: z.coerce.number().default(0),
      take: z.coerce.number().default(0),
    })
  ),
  zodSchemaBodyValidator(
    z.strictObject({
      userId: z.string(),
      email: z.string(),
    })
  ),
  async (req, res, next) => {
    try {
      const { skip = 0, take = 10 } = req.query;
      const { userId } = req.body;
      const foundPosts = await getAllPosts(userId, skip, take);
      return res.json(foundPosts);
    } catch (error) {
      console.error(`Error while fetching all posts`, error);
      next(error);
    }
  }
);

/**
 * @description Fetch a specific blog post by its ID
 */
postRouter.get(
  "/:postId",
  zodSchemaParamsValidator(z.strictObject({ postId: z.string() })),
  zodSchemaBodyValidator(
    z.strictObject({ userId: z.string(), email: z.string() })
  ),
  async (req, res, next) => {
    try {
      const { postId } = req.params;
      const foundPost = await getPostById(postId);
      return res.json(foundPost);
    } catch (error) {
      console.error(`Error while getting post by ID`, error);
      next(error);
    }
  }
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
      userId: z.string(),
      email: z.string(),
    })
  ),
  async (req, res, next) => {
    try {
      const { title, content, userId } = req.body;
      const createdPost = await createNewPost(userId, title, content);
      return res.json(createdPost);
    } catch (error) {
      console.error(`Error while creating a new post`, error);
      next(error);
    }
  }
);

/**
 * @description Update an existing blog post
 */
postRouter.put(
  "/:postId",
  zodSchemaParamsValidator(z.strictObject({ postId: z.string() })),
  zodSchemaBodyValidator(
    z.strictObject({
      userId: z.string(),
      email: z.string(),
      title: z.string(),
      content: z.string().optional(),
    })
  ),
  async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId, title, content } = req.body;
      const updatedPost = await updatePostById(postId, userId, title, content);
      return res.json(updatedPost);
    } catch (error) {
      console.error(`Error while trying to update the post`, error);
      next(error);
    }
  }
);

/**
 * @description Delete a blog post
 */
postRouter.delete(
  "/:postId",
  zodSchemaParamsValidator(z.strictObject({ postId: z.string() })),
  zodSchemaBodyValidator(
    z.strictObject({ userId: z.string(), email: z.string() })
  ),
  async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = req.body;
      const deleteResult = await deletePostById(postId, userId);
      return res.json({ deleteResult });
    } catch (error) {
      console.error(`Error while deleting post by ID`, error);
      next(error);
    }
  }
);
