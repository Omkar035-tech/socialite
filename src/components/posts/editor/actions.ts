"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataIncules } from "@/lib/types";
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
    include: postDataIncules,
  });

  return newPosts;
};

export default submitPost;
