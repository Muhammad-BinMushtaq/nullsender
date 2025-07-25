import { dbConnection } from "@/lib/dbConnection";
import UserModel from "@/models/user";
import { Message } from '@/models/user'
import { log } from "node:console";


export async function POST(request: Request) {
    await dbConnection()

    const { username, content } = await request.json()
    try {
        const user = await UserModel.findOne({ username })
        if (!user) {
            return Response.json({
                success: false,
                message: `username${' not found'}`,

            }, { status: 401 })
        }

        if (!user.isAcceptingMessage) {
            return Response.json({
                success: false,
                message: "This user is not accepting messages",

            }, { status: 403 })
        }
        const userMessage = { content, createdAt: new Date() }
        user.messages.push(userMessage as Message)
        await user.save()

        return Response.json({
            success: true,
            message: "Message sent successfully",

        }, { status: 201 })


    } catch (error) {
        console.log("internal server error", error);

        return Response.json({
            success: false,
            message: "internal server error", error,

        }, { status: 500 })
    }


}