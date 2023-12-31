import { model, Schema } from "mongoose";

export default model("Test", new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: false,
    versionKey: false
}));