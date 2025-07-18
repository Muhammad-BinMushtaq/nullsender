import mongoose from 'mongoose'

type connecitonBluePrint = {
    isConnected?: number
}

const connection: connecitonBluePrint = {}

export async function dbConnection(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected")
        return;
    }

    try {

        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
        connection.isConnected = db.connections[0].readyState
    } catch (error) {

        console.log(error,"connection failed")
        process.exit(1)
    }
}  