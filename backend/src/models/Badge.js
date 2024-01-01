import { model, Schema } from "mongoose";

export default model("Badge", new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    versionKey: false
}));