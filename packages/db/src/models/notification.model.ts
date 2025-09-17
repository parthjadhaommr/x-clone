import mongoose from "mongoose";

export const notificationSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["follow", "like", "comment"],
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            default: null,
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            default: null
        }
    },
    {
        timestamps: true
    }
);

// Add custom validation for notification type consistency
notificationSchema.pre('save', function() {
    if (this.type === 'follow') {
        if (this.post || this.comment) {
            throw new Error('Follow notifications should not have post or comment references');
        }
    } else if (this.type === 'like' || this.type === 'comment') {
        if (!this.post) {
            throw new Error(`${this.type} notifications must reference a post`);
        }
        if (this.type === 'comment' && !this.comment) {
            throw new Error('Comment notifications must reference a comment');
        }
    }
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;