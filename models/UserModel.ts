import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
}, {timestamps: true});

export const UserModel = mongoose.models?.Users || mongoose.model("Users", userSchema);