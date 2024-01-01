import { model, Schema } from "mongoose";

export default model("UserStatistic", new Schema({
    packsOpened: {
        type: Number,
        required: true,
        default: 0
    },
    messagesSent: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    versionKey: false
}));