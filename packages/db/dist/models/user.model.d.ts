import mongoose from "mongoose";
export declare const userSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    clerkId: string;
    email: string;
    firstName: string;
    username: string;
    profilePicture: string;
    bannerImage: string;
    location: string;
    followers: Buffer[];
    following: Buffer[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    clerkId: string;
    email: string;
    firstName: string;
    username: string;
    profilePicture: string;
    bannerImage: string;
    location: string;
    followers: Buffer[];
    following: Buffer[];
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    clerkId: string;
    email: string;
    firstName: string;
    username: string;
    profilePicture: string;
    bannerImage: string;
    location: string;
    followers: Buffer[];
    following: Buffer[];
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const User: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    clerkId: string;
    email: string;
    firstName: string;
    username: string;
    profilePicture: string;
    bannerImage: string;
    location: string;
    followers: Buffer[];
    following: Buffer[];
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    clerkId: string;
    email: string;
    firstName: string;
    username: string;
    profilePicture: string;
    bannerImage: string;
    location: string;
    followers: Buffer[];
    following: Buffer[];
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    clerkId: string;
    email: string;
    firstName: string;
    username: string;
    profilePicture: string;
    bannerImage: string;
    location: string;
    followers: Buffer[];
    following: Buffer[];
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
    clerkId: string;
    email: string;
    firstName: string;
    username: string;
    profilePicture: string;
    bannerImage: string;
    location: string;
    followers: Buffer[];
    following: Buffer[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    clerkId: string;
    email: string;
    firstName: string;
    username: string;
    profilePicture: string;
    bannerImage: string;
    location: string;
    followers: Buffer[];
    following: Buffer[];
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    clerkId: string;
    email: string;
    firstName: string;
    username: string;
    profilePicture: string;
    bannerImage: string;
    location: string;
    followers: Buffer[];
    following: Buffer[];
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
//# sourceMappingURL=user.model.d.ts.map