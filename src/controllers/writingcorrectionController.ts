import { Request, Response, NextFunction } from 'express';

const correctobot = (req: Request, res: Response, next: NextFunction) => {

    next();
}

export {
    correctobot
}