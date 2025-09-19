import mongoose from "mongoose";
export declare const commentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: Buffer;
    content: string;
    likes: Buffer[];
    post: Buffer;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: Buffer;
    content: string;
    likes: Buffer[];
    post: Buffer;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: Buffer;
    content: string;
    likes: Buffer[];
    post: Buffer;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const Comment: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: Buffer;
    content: string;
    likes: Buffer[];
    post: Buffer;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: Buffer;
    content: string;
    likes: Buffer[];
    post: Buffer;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: Buffer;
    content: string;
    likes: Buffer[];
    post: Buffer;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: Buffer;
    content: string;
    likes: Buffer[];
    post: Buffer;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: Buffer;
    content: string;
    likes: Buffer[];
    post: Buffer;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: Buffer;
    content: string;
    likes: Buffer[];
    post: Buffer;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Comment;
//# sourceMappingURL=comment.model.d.ts.map