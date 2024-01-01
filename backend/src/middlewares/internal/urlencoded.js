import { urlencoded } from "express";

export default {
    priority: 998,
    middleware: urlencoded({ extended: true })
}