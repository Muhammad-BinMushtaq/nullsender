import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/user";
import { dbConnection } from "@/lib/dbConnection";
import mongoose from "mongoose";



export async function POST(request: Request) {

    await dbConnection()

    const session = await getServerSession(authOptions)
    const user: User = session?.user


    if (!session || !session.user) {
        return Response.json({
            success: true,
            message: "User not loged in Please Login first "
        }, { status: 401 })
    }

    const userId = user._id
    const { acceptingMessage } = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
             userId ,
            { isAcceptingMessage: acceptingMessage },
            { new: true })


        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "Error wile updating message status"
            }, { status: 401 })
        }

        return Response.json({
            success: true,
            message: "successfully updated the status of accepting messages",
            updatedUser
        }, { status: 200 })

    }
    catch (error) {
        return Response.json({
            success: false,
            message: error
        }, { status: 500 })
    }

}


// GET request for current status of accepting messages

export async function GET(request: Request) {
    await dbConnection()
    const session = await getServerSession(authOptions)
    const user: User = session?.user


    if (!session || !session.user) {
        return Response.json({
            success: true,
            message: "User not loged in Please Login first "
        }, { status: 401 })
    }


    try {
        const userId = user._id

        const currentUser = await UserModel.findById(userId)

        if (!currentUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 401 })
        }

        return Response.json({
            success: true,
            isAcceptingMessage: currentUser.isAcceptingMessage,
            message: "fetch IsAccepting status successfully"
        }, { status: 200 })


    } catch (error) {
        return Response.json({
            success: false,
            message: "Error in getting message"
        }, { status: 500 })
    }





}
