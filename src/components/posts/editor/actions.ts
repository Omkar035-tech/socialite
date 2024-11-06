"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInculde } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";

const submitPost = async (input: string) => {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  const { content } = createPostSchema.parse({ content: input });

  const newPosts = await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
    include: getPostDataInculde(user.id),
  });

  return newPosts;
};

export default submitPost;
