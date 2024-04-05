import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User, Session, UserStatistic, UserSetting, Resource, IpAddress, UserIpAddress } from "src/models";
import { SequelizeService } from "src/sequelize/sequelize.service";
import { RedisService } from "src/redis/redis.service";
import { Repository } from "sequelize-typescript";
import { type Transaction } from "sequelize";
import { RegisterDto, LoginDto } from "./dto";
import { compare, hash } from "bcrypt";

@Injectable()
export class AuthService {
    private userRepo: Repository<User>;
    private userStatisticRepo: Repository<UserStatistic>;
    private userSettingRepo: Repository<UserSetting>;
    private sessionRepo: Repository<Session>;
    private resourceRepo: Repository<Resource>;
    private ipAddressRepo: Repository<IpAddress>;
    private userIpAddressRepo: Repository<UserIpAddress>;

    private defaultAvatar: Resource;
    private defaultBanner: Resource;

    constructor(
        private sequelizeService: SequelizeService,
        private redisService: RedisService
    ) { }

    async onModuleInit() {
        this.userRepo = this.sequelizeService.getRepository(User);
        this.userStatisticRepo = this.sequelizeService.getRepository(UserStatistic);
        this.userSettingRepo = this.sequelizeService.getRepository(UserSetting);
        this.sessionRepo = this.sequelizeService.getRepository(Session);
        this.resourceRepo = this.sequelizeService.getRepository(Resource);
        this.ipAddressRepo = this.sequelizeService.getRepository(IpAddress);
        this.userIpAddressRepo = this.sequelizeService.getRepository(UserIpAddress);

        this.defaultAvatar = await this.resourceRepo.findOne({ where: { id: 1 } });
        this.defaultBanner = await this.resourceRepo.findOne({ where: { id: 2 } });
    }

    async register(dto: RegisterDto, ip: string) {
        const transaction = await this.sequelizeService.transaction();

        const user = await this.userRepo.create({
            username: dto.username,
            password: await hash(dto.password, 10),
            avatarId: this.defaultAvatar.id,
            bannerId: this.defaultBanner.id
        }, { transaction });

        await this.userStatisticRepo.create({ id: user.id }, { transaction });
        await this.userSettingRepo.create({ id: user.id }, { transaction });

        await this.updateUserIp(user, ip, transaction);

        const session = await this.getOrCreateSession(user.id, transaction);

        return await transaction.commit().then(async () => {
            return { token: await this.sessionToToken(session) };
        });
    }

    async login(dto: LoginDto, ip: string) {
        const user = await this.userRepo.findOne({ where: { username: dto.username } });

        if (!user) throw new NotFoundException("The username you entered doesn't belong to an account. Please check your username and try again.");

        if (!await compare(dto.password, user.password)) throw new BadRequestException("Your password was incorrect. Please double-check your password.");

        const session = await this.getOrCreateSession(user.id);

        await this.updateUserIp(user, ip);

        return { token: await this.sessionToToken(session) };
    }

    async logout(userId: User["id"]) {
        await this.destroySession(userId);

        return;
    }

    async getOrCreateSession(userId: User["id"], transaction?: Transaction) {
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

    async updateUserIp(user: User, ip: string, transaction?: Transaction): Promise<void> {
        // transactions are goofy, if you don't use a current transaction you'll get a fk constraint error

        const [ipAddress] = await this.ipAddressRepo.findOrCreate({ where: { ipAddress: ip }, defaults: { ipAddress: ip }, transaction });
        const [userIpAddress] = await this.userIpAddressRepo.findOrCreate({ where: { userId: user.id, ipAddressId: ipAddress.id }, defaults: { userId: user.id, ipAddressId: ipAddress.id }, transaction });

        await this.userIpAddressRepo.increment("uses", { where: { id: userIpAddress.id }, transaction });
        await this.userRepo.update({ ipAddress: ip }, { where: { id: user.id }, transaction });
    }
}
