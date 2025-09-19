import mongoose from "mongoose";
export declare const notificationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "follow" | "like" | "comment";
    comment: Buffer;
    post: Buffer;
    from: Buffer;
    to: Buffer;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "follow" | "like" | "comment";
    comment: Buffer;
    post: Buffer;
    from: Buffer;
    to: Buffer;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "follow" | "like" | "comment";
    comment: Buffer;
    post: Buffer;
    from: Buffer;
    to: Buffer;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const Notification: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "follow" | "like" | "comment";
    comment: Buffer;
    post: Buffer;
    from: Buffer;
    to: Buffer;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "follow" | "like" | "comment";
    comment: Buffer;
    post: Buffer;
    from: Buffer;
    to: Buffer;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "follow" | "like" | "comment";
    comment: Buffer;
    post: Buffer;
    from: Buffer;
    to: Buffer;
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
    type: "follow" | "like" | "comment";
    comment: Buffer;
    post: Buffer;
    from: Buffer;
    to: Buffer;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "follow" | "like" | "comment";
    comment: Buffer;
    post: Buffer;
    from: Buffer;
    to: Buffer;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "follow" | "like" | "comment";
    comment: Buffer;
    post: Buffer;
    from: Buffer;
    to: Buffer;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Notification;
//# sourceMappingURL=notification.model.d.ts.map