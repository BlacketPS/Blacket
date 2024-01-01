import { model, Schema } from "mongoose";

export default model("Session", new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
}));