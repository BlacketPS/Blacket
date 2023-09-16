import { fileURLToPath } from "url";
import express from "express";
import path from "path";

export default express.static(path.dirname(fileURLToPath(import.meta.url)) + "/../../public");