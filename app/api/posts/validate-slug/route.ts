import { prisma } from "@/utils/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const existingPost = await prisma.post.findUnique({
    where: { slug },
  });

  return NextResponse.json({ exists: !!existingPost });
};
