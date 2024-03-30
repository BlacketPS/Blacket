import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { User, Session, UserStatistic, UserSetting, Resource } from "src/models";
import { RedisService } from "src/redis/redis.service";
import { SequelizeService } from "src/sequelize/sequelize.service";
import { Repository } from "sequelize-typescript";
import { type Transaction } from "sequelize";
import { RegisterDto, LoginDto } from "./dto";
import { compare, hash } from "bcrypt";
import { Request } from "express";

@Injectable()
export class AuthService {
    private userRepo: Repository<User>;
    private userStatisticRepo: Repository<UserStatistic>;
    private userSettingRepo: Repository<UserSetting>;
    private sessionRepo: Repository<Session>;
    private resourceRepo: Repository<Resource>;

    private defaultAvatar: Resource;
    private defaultBanner: Resource;

    constructor(
        private sequelize: SequelizeService,
        private redis: RedisService
    ) { }

    async onModuleInit() {
        this.userRepo = this.sequelize.getRepository(User);
        this.userStatisticRepo = this.sequelize.getRepository(UserStatistic);
        this.userSettingRepo = this.sequelize.getRepository(UserSetting);
        this.sessionRepo = this.sequelize.getRepository(Session);
        this.resourceRepo = this.sequelize.getRepository(Resource);

        this.defaultAvatar = await this.resourceRepo.findOne({ where: { id: 1 } });
        this.defaultBanner = await this.resourceRepo.findOne({ where: { id: 2 } });
    }

    async register(req: Request, dto: RegisterDto) {
        const transaction = await this.sequelize.transaction();

        const user = await this.userRepo.create({
            username: dto.username,
            password: await hash(dto.password, 10),
            avatarId: this.defaultAvatar.id,
            bannerId: this.defaultBanner.id,
            ipAddress: req.ip
        }, { transaction });

        await this.userStatisticRepo.create({ id: user.id }, { transaction });
        await this.userSettingRepo.create({ id: user.id }, { transaction });

        const session = await this.getSession(user.id, transaction);

        return await transaction.commit().then(() => {
            return { token: Buffer.from(JSON.stringify(session)).toString("base64") };
        });
    }

    async login(req: Request, dto: LoginDto) {
        const user = await this.userRepo.findOne({ where: { username: dto.username } });

        if (!user) throw new NotFoundException("The username you entered doesn't belong to an account. Please check your username and try again.");

        if (!await compare(dto.password, user.password)) throw new BadRequestException("Your password was incorrect. Please double-check your password.");

        const session = await this.getSession(user.id);

        return { token: Buffer.from(JSON.stringify(session)).toString("base64") };
    }

    async getSession(userId: User["id"], transaction?: Transaction) {
        const [session] = await this.sessionRepo.findOrCreate({ where: { userId }, defaults: { userId }, transaction });

        await this.redis.set(`blacket-session:${session.userId}`, JSON.stringify(session));

        return session;
    }

    async destroySession(userId: User["id"]) {
        const session = await this.sessionRepo.findOne({ where: { userId } });

        if (session) {
            this.redis.del(`blacket-session:${session.userId}`);

            session.destroy();
        }
    }
}
