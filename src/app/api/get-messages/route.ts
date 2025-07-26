import { dbConnection } from "@/lib/dbConnection";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import UserModel from "@/models/user";


export async function GET(_Request: Request) {
    await dbConnection()

    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "User not loged in Please Login first "
        }, { status: 401 })
    }

    const userId = new mongoose.Types.ObjectId(user._id)

    // const getUSer = await UserModel.findById(userId)
    const getUser = await UserModel.aggregate([

        { $match: { _id: userId } },

        { $unwind: "$messages" },

        { $sort: { "messages.createdAt": -1 } },

        { $group: { _id: '$_id', messages: { $push: '$messages' } } }


    ])


    if (!getUser || getUser.length === 0) {

        return Response.json({
            success: false,
            message: "Messages not found"
        }, { status: 401 })
    }


    return Response.json({
        success: true,
        message: "Messages found",
        messages: getUser[0]?.messages || []
    }, { status: 200 })

}