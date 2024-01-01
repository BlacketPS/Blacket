import { model, Schema } from "mongoose";

export default model("ClaimedDailyReward", new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
}, {
    versionKey: false
}));