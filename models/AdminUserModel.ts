import mongoose from "mongoose";

export interface RegisterSchemaTypes {
    name: string;
    email: string;
    password: string;
}

const userAdminSchema = new mongoose.Schema<RegisterSchemaTypes>({
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


export const AdminUserModel = mongoose.models?.AdminUsers || mongoose.model("AdminUsers", userAdminSchema);