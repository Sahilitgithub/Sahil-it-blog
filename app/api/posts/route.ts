import { prisma } from "@/utils/prisma/prismaClient";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const {title, slug, description, category, userId } = await request.json();
        const postData = await prisma.post.create({
                data: {
                    title: title,
                    slug: slug,
                    description: description,
                    category: category,
                    user: { connect: { id: userId } } // Connects the post to an existing user by id
                }
            })
        return Response.json({data: postData}, {status: 201})
    } catch (err) {
        if (err instanceof Error) {
            console.log("Error", err)
        }
        return Response.json({ error: err instanceof Error ? err.message : "An unknown error occurred" }, { status: 500 })
    }
}