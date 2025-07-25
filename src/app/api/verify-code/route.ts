import { dbConnection } from "@/lib/dbConnection";
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import UserModel from "@/models/user";



export async function POST(request: Request) {
    await dbConnection()

    try {
        const { username, verificationCode } = await request.json()

        console.log(verificationCode)
        if (!verificationCode) {
            return Response.json({
                success: false,
                message: " Verification code is required to for Account Verification "
            }, { status: 400 })
        }


        const user = await UserModel.findOne({ username })
        if (!user) {
            return Response.json({
                success: false,
                message: "No user found"
            }, { status: 400 })
        }

        console.log(username, verificationCode)

        const isCodeValid = user.verifyCode === verificationCode
        console.log(user.verifyCode, "is", verificationCode)
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()


        if (isCodeValid && isCodeNotExpired) {

            user.isVerified = true
            await user.save()
            return Response.json({
                success: true,
                message: "verification successfull"
            }, { status: 201 })
        }

        else if (!isCodeValid) {
            return Response.json({
                success: false,
                message: "incorrect verification code"
            }, { status: 401 })
        }

        else {
            return Response.json({
                success: false,
                message: "code is Expired"
            }, { status: 401 })

        }



    }
    catch (error) {
        return Response.json({
            success: false,
            message: "Error verifying user"
        }, { status: 400 })
    }

}




