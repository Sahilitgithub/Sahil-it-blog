import { prisma } from "@/utils/prisma/prismaClient";
import { NextRequest } from "next/server";
import bcrypt from 'bcryptjs'
import { userSchema } from "@/utils/zod-schema/ZodSchemaType";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const result = userSchema.safeParse(body);

        if(!result.success) {
            return Response.json({ error: result.error.format() }, { status: 400 })
        }

        const { name, email, password} = body;
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                name, 
                email,
                password: hashPassword
            }
        })
        return Response.json(user, {status: 201})
    } catch (error: unknown) {
        if(error instanceof Error) {
             return Response.json({errors: "User creation failed"}, {status: 500})
        }
    }
}