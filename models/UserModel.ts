import mongoose from "mongoose";

export interface UserTypes {
    clerkId: string;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    profilePicture?: string;
    isAdmin?: boolean;
} 

const userSchema = new mongoose.Schema<UserTypes>({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export const UserModel = mongoose.models?.User || mongoose.model("User", userSchema);
