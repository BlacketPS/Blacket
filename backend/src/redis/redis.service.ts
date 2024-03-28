import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisService extends Redis {
    constructor() {
        super({});
    }
}
