import errorMiddleware from "@middlewares/error.middleware";
import userRoute from "@routes/user.route";
import cors from "cors";
import express from "express";
import authRoute from "./routes/auth.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use(errorMiddleware);

export default app;
