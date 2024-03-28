import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User, Session } from "src/models";
import { RedisService } from "src/redis/redis.service";
import { RegisterDto, LoginDto } from "./dto";
import { compare, hash } from "bcrypt";
import { Request } from "express";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Session) private sessionModel: typeof Session,
        private redis: RedisService
    ) { }

    async register(req: Request, dto: RegisterDto) {
        const user = await this.userModel.create({
            username: dto.username,
            password: await hash(dto.password, 10),
            ipAddress: req.ip
        });

        const session = await this.sessionModel.create({ userId: user.id });

        return {
            sessionId: session.id,
            userId: user.id
        };
    }

    async login(req: Request, dto: LoginDto) {
        const user = await this.userModel.findOne({ where: { username: dto.username } });

        if (!user) throw new NotFoundException("The username you entered doesn't belong to an account. Please check your username and try again.");

        if (!await compare(dto.password, user.password)) throw new BadRequestException("Your password was incorrect. Please double-check your password.");

        const session = await this.sessionModel.create({ userId: user.id });

        return {
            sessionId: session.id,
            userId: user.id
        };
    }
}
