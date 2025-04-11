import { UserModel } from '@/models/UserModel';
import DbConnect from '@/utils/database/DbConnect';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
    try {
        const {name, email, password} = await request.json();
        console.log(name, email, password);

        if(!name || !email || !password) return NextResponse.json({errors: "Please fill all fields"}, {status: 400});

        await DbConnect(); // database connection

        // check if user already exists
        const existingUser = await UserModel.findOne({email});
        if(existingUser) return NextResponse.json({errors: "User already exist"}, {status: 409});

        // Make password has to keep secure
        const hashPassword = await bcrypt.hash(password, 10);
        
        // create a new user
        const User = new UserModel({name, email, password: hashPassword});

        const userData = await User.save();
        return NextResponse.json({message: "User registered successfully", data: userData}, {status: 201});

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({errors: error.message}, {status: 500});
        }
        return NextResponse.json({errors: "An unknown error occurred"}, {status: 500});
    }
}