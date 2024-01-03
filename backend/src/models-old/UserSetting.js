import { model, Schema } from "mongoose";

export default model("UserSetting", new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    friendRequests: {
        type: String,
        required: true,
        default: "on"
    },
    chatFormat: {
        type: Array,
        required: true,
        default: ["username", "clan"]
    }
}, {
    versionKey: false
}));