import { dbConnection } from '@/lib/dbConnection'
import UserModel from '@/models/user'
import bcrypt from 'bcrypt'
import { sendVerificationEmail } from "@/helper/sendVerificationEmail"


export async function POST(request: Request) {
    await dbConnection()

    try {
        const { username, email, password } = await request.json()
        const existingUserVerifiedByUserName = await UserModel.findOne(
            {
                username,
                isVerified: true
            }
        )


        if (existingUserVerifiedByUserName) {
            return Response.json(
                {
                    success: false,
                    message: "UserName is already taken"
                }, { status: 400 }
            )
        }


        const existingUserByEmail = await UserModel.findOne({ email })
        const verifyCode = Math.floor(10000 * Math.random() * 90000).toString()
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "This email is register before try new email"
                    }, { status: 400 }
                )
            }
            else {
                existingUserByEmail.password = await bcrypt.hash(password, 10),
                    existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()

            }
        }

        else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = await new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []

            })
            await newUser.save()

        }

        const emailResponse = await sendVerificationEmail(
            email,
            username,
            password
        )

        if (!emailResponse.messages) {
            return Response.json(
                {
                    success: false,
                    message: "failed to send verification email "
                }, { status: 400 }
            )
        }

        else {
            return Response.json(
                {
                    success: true,
                    message: "User registed and email sent successfully "
                }, { status: 201 }
            )
        }

    } catch (error) {

        console.log("Error registring User ", error)
        return Response.json(
            {
                success: false,
                message: "Failed to login"
            },
            { status: 500 }
        )
    }

}

