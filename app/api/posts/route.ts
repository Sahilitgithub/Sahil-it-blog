import { prisma } from "@/utils/prisma/prismaClient";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { userId: clerkId } = await auth(); // Await auth() to get userId
    if (!clerkId) {
      return NextResponse.json({ message: "Clerk user unauthorized" }, { status: 401 });
    }

    const { title, slug, description, category, featured, keywords } = await request.json();

    // ✅ Use the Clerk ID to find the user in your DB
    const existingUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ❗️Don't use the client-passed `userId` for `connect` (use DB ID from `existingUser`)
    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        description,
        category,
        featured: featured,
        keywords: Array.isArray(keywords) ? keywords.join(", ") : keywords || "",
        user: {
          connect: {
            id: existingUser.id, // Use server-trusted user ID
          },
        },
      },
    });

    return NextResponse.json({ data: newPost }, { status: 201 });
  } catch (err) {
    console.error("Post creation error:", err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
