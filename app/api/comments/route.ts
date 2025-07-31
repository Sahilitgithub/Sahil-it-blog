import { prisma } from "@/utils/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

// Get post comment
export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = request.nextUrl;
        const postId = searchParams.get("postId");
        if(!postId) return NextResponse.json({message: "PostId is required"}, {status: 400});

        const comments = await prisma.comment.findMany({
            where: {postId},
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(comments, {status: 200})
    } catch (error) {
        console.log("Fialed to get comment", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}

// Create post comment
export const POST  = async (request: Request) => {
    try {
        const { postId, userId, comment } = await request.json();
        if(!postId || !userId || !comment) {
            return NextResponse.json({message: 'Missing required fields.'}, {status: 400})
        }
       const comments = await prisma.comment.create({
        data: {
            postId,
            userId,
            comment
        }
       });
       return NextResponse.json(comments, {status: 201})
    } catch (error) {
        console.log("Failed to create comment", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}