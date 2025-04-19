// This file contains the function to create or update a user in Clerk.

import { UserModel } from "@/models/UserModel";
import { DbConnect } from "../database/DbConnect";

interface CreateOrUpdateUserParams {
  id: string; // Clerk ID of the user
  first_name: string;
  last_name: string;
  username: string;
  image_url?: string;
  email_addresses: { email_address: string }[]; // Array of objects with email_address property
}

// It uses the Clerk API to create or update a user based on the provided parameters.
export const createOrUpdateUser = async ({
  first_name,
  last_name,
  username,
  image_url,
  email_addresses,
}: CreateOrUpdateUserParams) => {
  try {
    await DbConnect();
    const user = await UserModel.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          first_name: first_name,
          last_name: last_name,
          username: username,
          profilePicture: image_url,
          email: email_addresses[0].email_address, // Assuming you want to use the first email address
        },
      },
      { new: true, upsert: true }
    );
    return user;
  } catch (error: unknown) {
    console.error("Error creating or updating clerk user:", error);
  }
};

// Delete user clerk id from mongodb
export const deleteUser = async (id: string) => {
  try {
    await DbConnect();
    await UserModel.findOneAndDelete({ clerkId: id });
  } catch (error: unknown) {
    console.error("Error deleting user:", error);
  }
};
