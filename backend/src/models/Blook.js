import { model, Schema } from "mongoose";

export default model("Blook", new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    rarity: {
        type: Schema.Types.ObjectId,
        ref: "Rarity",
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    }
}, {
    versionKey: false
}));