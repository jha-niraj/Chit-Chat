import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoute.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
connectDB();

const port = process.env.PORT || 4001;

app.use("/api/v1", userRoutes);
app.use("/api/v1", chatRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})