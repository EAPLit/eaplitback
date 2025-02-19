import express, { Request, Response, Router } from 'express';
import { correctobot, correctonotbot } from '@controllers/writingcorrectionController';

const writingcorrectionRouter: Router = express.Router();

writingcorrectionRouter.post('/correctobot', correctobot, (req: Request, res: Response) => {
    res.json({ success: true, message: "Successfully got correctobot results.", data: res.locals.responseData })
});

export default writingcorrectionRouter;