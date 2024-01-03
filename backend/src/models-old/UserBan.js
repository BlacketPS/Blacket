import { model, Schema } from "mongoose";

export default model("UserBan", new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    reason: {
        type: String,
        required: true,
        default: "no reason specified"
    },
    expiresAt: {
        type: Date,
        required: true
    },
    staffMember: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
}));