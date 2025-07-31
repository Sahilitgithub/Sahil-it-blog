import { prisma } from "@/utils/prisma/prismaClient";

// Delete post function
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const post = await prisma.post.delete({
      where: { id },
    });
    return Response.json(post, { status: 200 });
  } catch (error) {
    console.log("Post deleting error", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

// Update post function
export const PUT = async (request: Request, {params}: {params: {id: string}}) => {
  try {
    const { id } = params;
    const data = await request.json();
    
    const post = await prisma.post.update({
      where: { id },
      data: {
        ...data,
        keywords: data.keywords
          ? Array.isArray(data.keywords)
            ? data.keywords.join(", ")
            : data.keywords
          : "",
      },
    });

    return Response.json({ message: post }, { status: 201 });
  } catch (error) {
    console.log("Updating post error:", error);
    return Response.json("Internal Server Error", { status: 500 });
  }
};
