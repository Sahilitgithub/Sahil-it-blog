// app/api/log-visit/route.ts
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

// Get visitor function
export async function POST(req: NextRequest) {
  try {
    const { userAgent, device, userId } = await req.json()

    await prisma.visitors.create({
      data: {
        userAgent,
        device,
        userId,
      },
    })

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error logging visit:", error)
    return NextResponse.json({ error: "Failed to log visit" }, { status: 500 })
  }
}
