import { dbConnection } from "@/lib/dbConnection";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { success } from "zod/v4";
import UserModel from "@/models/user";

export async function DELETE(request: Request, { params }: { params: { messageId: string } }) {
    const messaegeId = params.messageId
    dbConnection()
    const userId = params.messageId
    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticated"
            }, { status: 401 })
    }

    try {
        const deletedMessage = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { messages: { _id: messaegeId } } }
        )

        if (deletedMessage.modifiedCount === 0) {
            return Response.json(
                {
                    success: false,
                    message: "Message already deleted or Not found"
                }, { status: 401 })
        }

        return Response.json(
            {
                success: true,
                message: "Message deleted successfully"
            }, { status: 200 })
    }




    catch (error) {
        return Response.json(
            {
                success: false,
                message: "Something went wrong"
            }, { status: 401 })
    }

}