import { model, Schema } from "mongoose";

export default model("UserBadge", new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    badge: {
        type: Schema.Types.ObjectId,
        ref: "Badge",
        required: true
    },
    grantedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
}));