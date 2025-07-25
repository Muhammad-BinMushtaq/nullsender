import UserModel from "@/models/user";
import { dbConnection } from "@/lib/dbConnection";
import { userNameValidation } from "@/schemas/signUpSchema";
import z from 'zod'


const userNameSchema = z.object({
    username: userNameValidation
})

export async function GET(request: Request) {
    await dbConnection();

  
    // console.log(request.url);

    try {
        const { searchParams } = new URL(request.url)
        const queryParams = {
            username: searchParams.get('username')
        }

        const result = userNameSchema.safeParse(queryParams)

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []

            console.log(result)
            return Response.json({
                success: false,
                message: usernameErrors.length > 0 ? usernameErrors.join(', ') : 'invalid query parameter'
            }, { status: 400 })
        }

        const { username } = result.data
        console.log(username)

        const existingVerifiedUser = await UserModel.findOne({
            username:username,
            isVerified: true
        })

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "This username is already taken"
            }, { status: 500 })
        }

        return Response.json({
            status: true,
            message: "Username is availble"
        }, { status: 200 })

    }

    catch (error) {


        console.log(error)
        Response.json(
            {
                success: false,
                message: "Username checking failed"
            }, { status: 500 }
        )
    }
}

