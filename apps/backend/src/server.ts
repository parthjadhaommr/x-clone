import express, { Application, application } from 'express'
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/user.route";
import postRoutes from "./routes/post.route"
import commentRoutes from "./routes/comment.route";
import notificationRoutes from "./routes/notification.route";

import { ENV } from './config/env';
import { connectDB } from './config/db';


const app: Application = express();

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("api/notification", notificationRoutes)

app.get("/", (req, res) => {
    res.json({ message: "API is running", status: "healthy" });
})

const startServer = async () => {
    try {
        await connectDB()
        if (ENV.NODE_ENV !== "production") {
            app.listen(ENV.PORT, () => console.log("Server is up and running on Port", ENV.PORT))
        }
    } catch (error) {
        console.log("Failed to start Server", error)
        process.exit(1)
    }
}

// export for vercel
startServer()
export default app