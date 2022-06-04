import mongoose from "mongoose"

export const connectDB = (uri: string): void => {
    mongoose.connect(uri, () => {
        console.log('connected to db')
    })
}

