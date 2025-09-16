import mongoose from "mongoose";
import { ENV } from "./env";

export const connectDB = async () => {
    try {
        if (!ENV.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose.connect(ENV.MONGO_URI);
        console.log("Connected To Database Successfully");
    } catch (error) {
        console.error("Error Connecting to MongoDB:", error);
        throw error;
    }
    
}