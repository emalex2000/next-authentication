import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try {

        const reqBody = await request.json()
        const [email, password] = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})
        if (!user){
            return NextResponse.json(
                {error: "user with"+ user + "does not exist"}
                )
        }

        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json(
                {error: "password is invalid"},
                {status: 400}
            )
        }

        const createTokenData = {
            id : user._id,
            username: user.username,
            email: user.email
        }
        const createToken = await jwt.sign(
            createTokenData,
            process.env.TOKEN_SECRET!,
            { expiresIn: "1d" }
        )

        const response = NextResponse.json({
            message: "succesfull",
            success: true,
        })
        response.cookies.set(
            "token", 
            createToken,
            {
                httpOnly: true,
        });
        return response
        

    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
            )
    }
}