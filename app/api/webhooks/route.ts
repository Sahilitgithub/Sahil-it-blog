// // app/api/webhooks/clerk/route.ts
// import { headers } from 'next/headers'
// import { Webhook } from 'svix'
// import { prisma } from '@/utils/prisma/prismaClient'

// const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || ''

// export async function POST(req: Request) {
//   const payload = await req.text()
//   const headerPayload = Object.fromEntries(headers())

//   const wh = new Webhook(CLERK_WEBHOOK_SECRET)

//   let evt: any

//   try {
//     evt = wh.verify(payload, headerPayload)
//   } catch (err) {
//     return new Response('Webhook error', { status: 400 })
//   }

//   const { type, data } = evt

//   if (type === 'user.created') {
//     const { id, email_addresses, first_name, last_name } = data

//     const email = email_addresses[0]?.email_address

//     await prisma.user.upsert({
//       where: { email },
//       update: {},
//       create: {
//         name: `${first_name ?? ''} ${last_name ?? ''}`.trim(),
//         email,
//       },
//     })
//   }

//   return new Response('OK', { status: 200 })
// }


import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}