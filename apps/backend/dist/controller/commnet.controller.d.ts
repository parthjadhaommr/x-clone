import { RequestHandler } from "express";
export declare const getComments: RequestHandler<{
    postId: string;
}>;
export declare const createComment: RequestHandler<{
    postId: string;
}>;
export declare const deleteComment: RequestHandler<{
    commentId: string;
}>;
//# sourceMappingURL=commnet.controller.d.ts.map