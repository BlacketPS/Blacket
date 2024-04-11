import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User, Session, UserSetting } from "src/models";
import { SequelizeService } from "src/sequelize/sequelize.service";
import { RedisService } from "src/redis/redis.service";
import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";
import { Repository } from "sequelize-typescript";
import { type Transaction } from "sequelize";
import { RegisterDto, LoginDto } from "./dto";
import { compare } from "bcrypt";

import { BadRequest, NotFound } from "src/types/enums";

@Injectable()
export class AuthService {
    private userRepo: Repository<User>;
    private userSettingRepo: Repository<UserSetting>;
    private sessionRepo: Repository<Session>;

    constructor(
        private sequelizeService: SequelizeService,
        private redisService: RedisService,
        private usersService: UsersService,
        private configService: ConfigService
    ) { }

    async onModuleInit() {
        this.userRepo = this.sequelizeService.getRepository(User);
        this.userSettingRepo = this.sequelizeService.getRepository(UserSetting);
        this.sessionRepo = this.sequelizeService.getRepository(Session);
    }

    async register(dto: RegisterDto, ip: string) {
        if (this.configService.get<string>("VITE_USER_FORMS_ENABLED") === "true") throw new BadRequestException(BadRequest.AUTH_FORMS_ENABLED);

        const transaction = await this.sequelizeService.transaction();

        const user = await this.usersService.createUser(dto.username, dto.password, transaction);

        await this.usersService.updateUserIp(user, ip, transaction);

        const session = await this.findOrCreateSession(user.id, transaction);

        return await transaction.commit().then(async () => {
            return { token: await this.sessionToToken(session) };
        });
    }

    async login(dto: LoginDto, ip: string) {
        const user = await this.userRepo.findOne({ where: { username: dto.username } });

        if (!user) throw new NotFoundException(NotFound.UNKNOWN_USER);

        if (!await compare(dto.password, user.password)) throw new BadRequestException(BadRequest.AUTH_INCORRECT_PASSWORD);

        const session = await this.findOrCreateSession(user.id);

        await this.usersService.updateUserIp(user, ip);

        return { token: await this.sessionToToken(session) };
    }

    async logout(userId: User["id"]) {
        return await this.destroySession(userId);
    }

    async findOrCreateSession(userId: User["id"], transaction?: Transaction) {
        const [session] = await this.sessionRepo.findOrCreate({ where: { userId }, defaults: { userId }, transaction });

        await this.redisService.set(`blacket-session:${session.userId}`, JSON.stringify(session));

        return session;
    }

    async destroySession(userId: User["id"]) {
        const session = await this.sessionRepo.findOne({ where: { userId } });

        if (session) {
            this.redisService.del(`blacket-session:${session.userId}`);

            session.destroy();
        }
    }

    async sessionToToken(session: Session) {
        return Buffer.from(JSON.stringify(session)).toString("base64");
    }
}
