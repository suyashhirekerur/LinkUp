import mongoose from "mongoose"

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log("Pinged your deployment. You successfully connected to MongoDB!", conn.connection.host)
    } catch (error) {
        console.log("Error Connecting to  MongoDB!", error);
        process.exit(1) //1 status means fail, 0 means connection succssful 
    }
}

