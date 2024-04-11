import { Injectable } from "@nestjs/common";
import { Repository } from "sequelize-typescript";
import { User, UserTitle, UserBanner, UserBlook, UserStatistic, UserSetting, IpAddress, UserIpAddress, Resource, Title, Font } from "src/models";
import { SequelizeService } from "src/sequelize/sequelize.service";
import { hash } from "bcrypt";
import { Op, type Transaction } from "sequelize";

export interface GetUserSettings {
    includeBlooks?: boolean;
    includeTitles?: boolean;
    includeBanners?: boolean;
    includeStatistics?: boolean;
    includeSettings?: boolean;
}

@Injectable()
export class UsersService {
    private userRepo: Repository<User>;
    private userTitleRepo: Repository<UserTitle>;
    private userBannerRepo: Repository<UserBanner>;
    private userBlookRepo: Repository<UserBlook>;
    private userStatisticRepo: Repository<UserStatistic>;
    private userSettingRepo: Repository<UserSetting>;
    private ipAddressRepo: Repository<IpAddress>;
    private userIpAddressRepo: Repository<UserIpAddress>;
    private titleRepo: Repository<Title>;
    private fontRepo: Repository<Font>;
    private resourceRepo: Repository<Resource>;

    private defaultAvatar: Resource;
    private defaultBanner: Resource;
    private defaultTitle: Title;
    private defaultFont: Font;

    constructor(
        private sequelizeService: SequelizeService
    ) { }

    async onModuleInit() {
        this.userRepo = this.sequelizeService.getRepository(User);
        this.userTitleRepo = this.sequelizeService.getRepository(UserTitle);
        this.userBannerRepo = this.sequelizeService.getRepository(UserBanner);
        this.userBlookRepo = this.sequelizeService.getRepository(UserBlook);
        this.userStatisticRepo = this.sequelizeService.getRepository(UserStatistic);
        this.userSettingRepo = this.sequelizeService.getRepository(UserSetting);
        this.ipAddressRepo = this.sequelizeService.getRepository(IpAddress);
        this.userIpAddressRepo = this.sequelizeService.getRepository(UserIpAddress);
        this.titleRepo = this.sequelizeService.getRepository(Title);
        this.fontRepo = this.sequelizeService.getRepository(Font);
        this.resourceRepo = this.sequelizeService.getRepository(Resource);

        this.defaultAvatar = await this.resourceRepo.findOne({ where: { id: 1 } });
        this.defaultBanner = await this.resourceRepo.findOne({ where: { id: 2 } });
        this.defaultTitle = await this.titleRepo.findOne({ where: { id: 1 } });
        this.defaultFont = await this.fontRepo.findOne({ where: { id: 1 } });
    }

    async getUser(user: string, settings: GetUserSettings = {}) {
        const userData: User = await this.userRepo.findOne({
            where: this.sequelizeService.or({ id: user }, { username: { [Op.like]: user } }),
            attributes: {
                exclude: [
                    "avatarId",
                    "customAvatarId",
                    "bannerId",
                    "customBannerId"
                ]
            },
            include: [
                { model: this.resourceRepo, as: "avatar" },
                { model: this.resourceRepo, as: "banner" },
                { model: this.resourceRepo, as: "customAvatar" },
                { model: this.resourceRepo, as: "customBanner" },
                { model: this.userTitleRepo, as: "titles", attributes: { exclude: [this.userTitleRepo.primaryKeyAttribute] } },
                { model: this.userBannerRepo, as: "banners", attributes: { exclude: [this.userBannerRepo.primaryKeyAttribute] } },
                { model: this.userBlookRepo, as: "blooks", attributes: UserBlook["blookId"], where: { sold: false }, required: false },
                { model: this.userStatisticRepo, as: "statistics", attributes: { exclude: [this.userStatisticRepo.primaryKeyAttribute] } },
                { model: this.userSettingRepo, as: "settings", attributes: { exclude: [this.userSettingRepo.primaryKeyAttribute] } }
            ]
        });

        if (!userData) return null;

        return userData;
    }

    // transactions are goofy, if you don't use a current transaction you'll get a fk constraint error

    async createUser(username: string, password: string, transaction?: Transaction): Promise<User> {
        const user = await this.userRepo.create({
            username: username,
            password: await hash(password, 10),
            avatarId: this.defaultAvatar.id,
            bannerId: this.defaultBanner.id,
            titleId: this.defaultTitle.id,
            fontId: this.defaultFont.id
        }, { transaction });

        await this.userStatisticRepo.create({ id: user.id }, { transaction });
        await this.userSettingRepo.create({ id: user.id }, { transaction });

        return user;
    }

    async updateUserIp(user: User, ip: string, transaction?: Transaction): Promise<void> {
        const [ipAddress] = await this.ipAddressRepo.findOrCreate({ where: { ipAddress: ip }, defaults: { ipAddress: ip }, transaction });
        const [userIpAddress] = await this.userIpAddressRepo.findOrCreate({ where: { userId: user.id, ipAddressId: ipAddress.id }, defaults: { userId: user.id, ipAddressId: ipAddress.id }, transaction });

        await this.userIpAddressRepo.increment("uses", { where: { id: userIpAddress.id }, transaction });
        await this.userRepo.update({ ipAddress: ip }, { where: { id: user.id }, transaction });
    }
}
