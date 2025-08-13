import { prisma } from "@/utils/prisma/prismaClient"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { userAgent, device, userId } = body

    const result = await prisma.visitors.create({
      data: {
        userAgent,
        device,
        userId,
      },
    })

    return NextResponse.json({message: result}, { status: 200 })
  } catch (error) {
    console.error("Error logging visit:", error)
    return NextResponse.json({ error: "Failed to log visit" }, { status: 500 })
  }
}
