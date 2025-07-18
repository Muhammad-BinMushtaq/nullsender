import mongoose, { Schema } from 'mongoose'



export interface Message extends Document {
    content: string,
    createdAt: Date,

}

const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,

    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }

})

// user schema 

export interface User extends Document {

    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    messages: Message[]

}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter valid email "]
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "verification code is required"],

    },
    isVerified: {
        type: Boolean,
        default: false

    },

    verifyCodeExpiry: {
        type: Date,
        required: [true, "verification code expiry is required"],
    },

    isAcceptingMessage: {
        type: Boolean,
        required: true
    },
    messages: {
        type: [messageSchema],

    }



})

const UserModel = (mongoose.models.User as mongoose.Model<User>) ||
    (mongoose.model<User>("User", userSchema))

export default UserModel