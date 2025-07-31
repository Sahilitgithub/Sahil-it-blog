import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { prisma } from "@/utils/prisma/prismaClient";

// Post users from clerk
export async function POST(req: Request) {
  const secret = process.env.SIGNING_SECRET;
  if (!secret) return new Response("Webhook secret is not founded", { status: 500 });

  const wh = new Webhook(secret);
  const body = await req.text();
  const headerPayload = await headers();

  const event = wh.verify(body, {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  }) as WebhookEvent;

  if (event.type === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    console.log("image_url: ", event.data.image_url)
    await prisma.user.upsert({
      where: { clerkId: id },
      update: {},
      create: {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        password: "123456", // Set a default or generated password as required by your logic
        image_url: image_url,
      },
    });
  }

  return Response.json({message: "User created successfully"}, { status: 200 });
}