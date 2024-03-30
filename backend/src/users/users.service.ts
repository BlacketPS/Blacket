import { Injectable } from "@nestjs/common";
import { Repository } from "sequelize-typescript";
import { User, UserStatistic, UserSetting, Resource } from "src/models";
import { SequelizeService } from "src/sequelize/sequelize.service";

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

    async getUserById(id: string): Promise<User> {
        return this.userRepo.findByPk(id, {
            attributes: {
                exclude: [
                    "ipAddress",
                    "avatarId",
                    "bannerId"
                ]
            },
            include: [
                {
                    model: this.resourceRepo,
                    as: "avatar",
                    attributes: ["path"]
                },
                {
                    model: this.resourceRepo,
                    as: "banner",
                    attributes: ["path"]
                },

                {
                    model: this.userStatisticRepo,
                    as: "statistics",
                    attributes: { exclude: [this.userStatisticRepo.primaryKeyAttribute] }
                },
                {
                    model: this.userSettingRepo,
                    as: "settings",
                    attributes: { exclude: [this.userSettingRepo.primaryKeyAttribute] }
                }
            ]
        });
    }
}
