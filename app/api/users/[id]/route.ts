import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE = async (request: Request, {params}: {params: {id: string}}) => {
    const { id } = params;
    try {
        const client = await clerkClient();
        await client.users.deleteUser(id);
        return NextResponse.json({ message: `User ${id} deleted.` }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return new Response("Failed to fetch user", { status: 500 });
        
    }
}