import express, { Request, Response, Router } from 'express';
import { correctobot } from '@controllers/writingcorrectionController';

const writingcorrectionRouter: Router = express.Router();

writingcorrectionRouter.post('/correctobot', (req: Request, res: Response) => {

    res.json({ success: true, message: "Successfully got correctobot results."})
});

export default writingcorrectionRouter;