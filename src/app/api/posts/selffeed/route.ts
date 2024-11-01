import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataIncules } from "@/lib/types";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return Response.json({ error: "Unauthozied" }, { status: 401 });
    }
    const posts = await prisma.post.findMany({
      include: postDataIncules,
      orderBy: { createdAt: "desc" },
    });
    return Response.json(posts);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}