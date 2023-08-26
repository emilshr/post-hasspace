import { Schema, Types, model } from "mongoose";

export interface Post {
  title: string;
  content?: string;
  userId: Types.ObjectId;
}

const PostSchema = new Schema<Post>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  userId: {
    type: "ObjectId",
    ref: "User",
  },
});

export const PostModel = model("Post", PostSchema);
