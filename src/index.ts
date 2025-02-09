import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

import authRouter from "@router/auth";

const app: Express = express();

app.use(express.json());
const corsOptions = {
    origin: `${process.env.FRONTEND_URL}`,
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.use("/auth", authRouter);

console.log("Front end URL from env: ", process.env.FRONTEND_URL);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});