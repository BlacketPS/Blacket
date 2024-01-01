import { model, Schema } from "mongoose";

export default model("UserBlook", new Schema({
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
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    obtainedBy: {
        type: String,
        required: true,
        default: "unknown"
    },
    originallyObtainedBy: {
        type: String,
        required: true,
        default: "unknown"
    }
}, {
    timeStamps: true,
    versionKey: false
}));