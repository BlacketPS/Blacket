import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { User } from "../models";

import { Request } from "express";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private userModel: typeof User
    ) { }

    async register(request: Request) {
        await this.userModel.create({
            username: "Piotr",
            password: "password",
            ipAddress: request.ip
        });
    }
}