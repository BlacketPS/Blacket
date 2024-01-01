import { model, Schema } from "mongoose";

export default model("Rarity", new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    },
    packOpeningAnimation: {
        type: String,
        required: true,
        enum: ["uncommon", "rare", "epic", "legendary", "chroma"]
    },
    experience: {
        type: Number,
        required: true,
        default: 0
    },
    waitTime: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    versionKey: false
}));