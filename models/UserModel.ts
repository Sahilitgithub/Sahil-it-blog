import mongoose from "mongoose";

export interface RegisterSchemaTypes {
    name: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<RegisterSchemaTypes>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }

}, {timestamps: true});


export const UserModel = mongoose.models?.Users || mongoose.model("Users", userSchema);