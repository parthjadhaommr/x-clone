import { NextFunction, Request, Response } from "express";
export declare const protectRoute: (req: Request & {
    auth?: {
        userId: string;
    };
}, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map