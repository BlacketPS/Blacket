import { Injectable } from "@nestjs/common";
import { Repository } from "sequelize-typescript";
import { User, UserStatistic, UserSetting, Resource } from "src/models";
import { SequelizeService } from "src/sequelize/sequelize.service";

// fix your body it needs to be better

@Injectable()
export class UsersService {
    private userRepo: Repository<User>;
    private userStatisticRepo: Repository<UserStatistic>;
    private userSettingRepo: Repository<UserSetting>;
    private resourceRepo: Repository<Resource>;

    constructor(
        private sequelize: SequelizeService
    ) { }

    onModuleInit() {
        this.userRepo = this.sequelize.getRepository(User);
        this.userStatisticRepo = this.sequelize.getRepository(UserStatistic);
        this.userSettingRepo = this.sequelize.getRepository(UserSetting);
        this.resourceRepo = this.sequelize.getRepository(Resource);
    }

    async getUserById(id: string) {
        const user: User = await this.userRepo.findByPk(id, {
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
                { model: this.userStatisticRepo, as: "statistics", attributes: { exclude: [this.userStatisticRepo.primaryKeyAttribute] } },
                { model: this.userSettingRepo, as: "settings", attributes: { exclude: [this.userSettingRepo.primaryKeyAttribute] } }
            ]
        });

        if (!user) return null;

        return {
            ...user.toJSON(),
            avatar: user.avatarPath,
            banner: user.bannerPath,
            blooks: {}
        };
    }
}
