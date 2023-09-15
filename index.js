global.config = await import("./config.js");
import { Elysia } from "elysia";

new Elysia().listen(config.port);