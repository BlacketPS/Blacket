import { urlencoded } from "express";

export default {
    priority: 99,
    middleware: urlencoded({ extended: true })
}