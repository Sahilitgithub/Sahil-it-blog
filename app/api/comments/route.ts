import { prisma } from "@/utils/prisma/prismaClient";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const { postId, userId, comment } = await request.json();
        const comments = await prisma.comment.create({
            data: {postId, userId, comment}
        });
        return Response.json(comments, {status: 201})
    } catch (error: unknown) {
        if(error instanceof Error) {
            return Response.json({error: "Comment creation failed"}, {status: 500})
        }
    }
}