import { model, Schema } from "mongoose";

export default model("User", new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    banner: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true,
        default: "Common"
    },
    font: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: true,
        default: "#ffffff"
    },
    tokens: {
        type: Number,
        required: true,
        default: 0
    },
    experience: {
        type: Number,
        required: true,
        default: 0
    },
    permissions: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    ipAddress: {
        type: String,
        required: true
    }
}, {
    versionKey: false
}));