import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

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

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});