import express { Express, Response, Router } from 'express';

const mylearningRouter: Router = express.Router();


mylearningRouter.get('/getProjectList', (req: Request, res: Result) => {

    res.json({ message: "success" });
});