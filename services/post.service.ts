import { PostModel } from "../models/post.model";

export const getPostById = async (postId: string) => {
  const foundPost = await PostModel.findById(postId);

  if (foundPost) {
    const { title, content } = foundPost;
    return { title, content };
  }

  throw new Error("Post not found");
};

export const updatePostById = async (
  postId: string,
  userId: string,
  title: string,
  content?: string
) => {
  const updatedPost = await PostModel.findOneAndUpdate(
    { _id: postId, userId },
    { title, content }
  );
  if (updatedPost) {
    return updatedPost;
  }
  throw new Error("Post not found");
};

export const deletePostById = async (postId: string, userId: string) => {
  const deletedPost = await PostModel.deleteOne({ _id: postId });
  return deletedPost.acknowledged;
};

export const getAllPosts = async (userId: string, skip = 0, take = 10) => {
  const data = await PostModel.find(
    { userId },
    { title: true, content: true },
    { skip, take }
  );
  return data.map(({ title, content }) => ({ title, content }));
};

export const createNewPost = async (
  userId: string,
  title: string,
  content?: string
) => {
  const createdPost = await PostModel.create({ title, content, userId });
  return createdPost;
};
