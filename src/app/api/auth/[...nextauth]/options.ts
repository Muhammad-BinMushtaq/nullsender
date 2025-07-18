import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrtypt from 'bcrypt'
import UserModel from "@/models/user"
import { dbConnection } from "@/lib/dbConnection"



export const authOptions: NextAuthOptions = {


    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',

            credentials: {
                identifier: { label: "email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials: any): Promise<any> {
                await dbConnection()

                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    })

                    if (!user) {
                        throw new Error("This email or username is incorrect")
                    }

                    if (!user.isVerified) {
                        throw new Error("Please verify before Login")
                    }

                    const isPasswordCorrect = await bcrtypt.compare(credentials.password, user.password)

                    if (isPasswordCorrect) {
                        return user
                    }

                    throw new Error("Invalid credentials")
                } catch (err: any) {

                    throw new Error(err)
                }
            },

        })
    ],

    callbacks: {

        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessage = user.isAcceptingMessage
                token.username = user.username
            }
            return token
        },

        async session({ session, user, token }) {
            if (token) {
                session.user._id = token._id
            }

            return session
        }

    },

    session: {
        strategy: "jwt"
    },

    secret: process.env.NEXT_AUTH_SECRET,
    
    pages: {
        signIn: '/sign-in',
    },
}
