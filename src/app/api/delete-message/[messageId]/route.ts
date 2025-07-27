
import { dbConnection } from "@/lib/dbConnection";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/models/user";
import { NextRequest } from "next/server";

export async function DELETE(

    request: NextRequest, // ✅ must be from 'next/server'
    { params }: { params: { messageId: string } } // ✅ context object

) {

    const { messageId } = params
    // const messaegeId = params.messageId
    // new 
    dbConnection()
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
            {
                $pull: {
                    messages: {
                        _id: messageId

                    }
                }
            }
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




    catch (_error) {
        return Response.json(
            {
                success: false,
                message: "Something went wrong"
            }, { status: 401 })
    }

}