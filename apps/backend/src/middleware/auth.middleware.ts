import { NextFunction, Request, Response } from "express";

export const protectRoute = async (
    req: Request & { auth?: { userId: string } },
    res: Response,
    next: NextFunction
) => {
    if (!req.auth?.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }
    next()
}
