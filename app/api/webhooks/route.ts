import { createOrUpdateUser, deleteUser } from "@/utils/clerkUserAction/UserAction";
import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt?.data;
    const eventType = evt?.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    if (eventType === "user.created" || eventType === "user.updated") {
      const { first_name, last_name, username, image_url, email_addresses, id } =
        evt?.data;

      try {
        const user = await createOrUpdateUser({
          id,
          first_name: first_name ?? "",
          last_name: last_name ?? "",
          username: username ?? "",
          image_url,
          email_addresses,
        });
       
        if(user && eventType === "user.created"){
          try {
            await clerkClient.users.updateUserMatadata(id, {
              publicMetadata: {
                userMongodbId: user._id,
                isAdmin: user.isAdmin,
              },
            })
          } catch (error: unknown) {
            console.error("Error updating clerk user public metadata:", error);
            
          }
        }

      } catch (error: unknown) {
        console.error("Error creating or updating clerk user:", error);
        return new Response("Error occured while create and updating user", { status: 400 });
      }
    }

    // Delete user if condition
    if(eventType === "user.deleted") {
      const { id } = evt?.data;
      try {
        if (id) {
          await deleteUser(id);
        } else {
          console.error("Error: User ID is undefined.");
          return new Response("User ID is undefined", { status: 400 });
        }
      } catch (error: unknown) {
        console.error("Error deleting user:", error);
        return new Response("Error occured while deleting user", { status: 400 });
      }

    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
