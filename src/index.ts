import express from "express";
import { dbConnect } from "./db/dbConfig";
import authRouter from "./routes/authRoutes";
import dotenv from "dotenv";
import jobcardRouter from "./routes/jobCardRoutes";
dotenv.config({ path: "./.env" });
const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        message: "server is running"
    })
})
app.use("/api/auth", authRouter);
app.use("/api/jobcard", jobcardRouter);

dbConnect().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
})
