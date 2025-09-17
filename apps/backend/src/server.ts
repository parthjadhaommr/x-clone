import express from 'express'
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/user.route";
import postRoutes from "./routes/post.route"

import { ENV } from './config/env';
import { connectDB } from './config/db';


const app = express();

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.get("/", (req, res) => {
    res.json({ message: "API is running", status: "healthy" });
})

connectDB().catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
});

const port = ENV.PORT || 5001;
if (isNaN(Number(port)) || Number(port) < 1 || Number(port) > 65535) {
    throw new Error(`Invalid port: ${port}`);
}
app.listen(port, () => console.log("Server is up and running on port:", port));
