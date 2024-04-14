import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisService } from "src/redis/redis.service";
import { Repository, Sequelize } from "sequelize-typescript";
import { BlacketLoggerService } from "src/core/logger/logger.service";
import * as Models from "src/models";

import { AnimationType } from "src/models/rarity.model";

@Injectable()
export class SequelizeService extends Sequelize {
    private sessionRepo: Repository<Models.Session>;
    private resourceRepo: Repository<Models.Resource>;
    private roomRepo: Repository<Models.Room>;
    private blookRepo: Repository<Models.Blook>;
    private rarityRepo: Repository<Models.Rarity>;
    private packRepo: Repository<Models.Pack>;
    private itemRepo: Repository<Models.Item>;
    private titleRepo: Repository<Models.Title>;
    private bannerRepo: Repository<Models.Banner>;
    private fontRepo: Repository<Models.Font>;
    private emojiRepo: Repository<Models.Emoji>;

    constructor(
        private readonly configService: ConfigService,
        private readonly redisService: RedisService,
        private readonly blacketLogger: BlacketLoggerService
    ) {
        super({
            dialect: "postgres",
            username: configService.get<string>("SERVER_DATABASE_USER"),
            password: configService.get<string>("SERVER_DATABASE_PASSWORD"),
            database: configService.get<string>("SERVER_DATABASE_NAME"),
            host: configService.get<string>("SERVER_DATABASE_HOST"),
            port: configService.get<number>("SERVER_DATABASE_PORT"),
            repositoryMode: true,
            models: Object.values(Models),
            logging: configService.get<string>("NODE_ENV") === "production" ? false : (msg) => blacketLogger.debug(msg, "Database", "Sequelize")
        });
    }

    async onModuleInit() {
        this.sessionRepo = this.getRepository(Models.Session);
        this.resourceRepo = this.getRepository(Models.Resource);
        this.roomRepo = this.getRepository(Models.Room);
        this.blookRepo = this.getRepository(Models.Blook);
        this.rarityRepo = this.getRepository(Models.Rarity);
        this.packRepo = this.getRepository(Models.Pack);
        this.itemRepo = this.getRepository(Models.Item);
        this.titleRepo = this.getRepository(Models.Title);
        this.bannerRepo = this.getRepository(Models.Banner);
        this.fontRepo = this.getRepository(Models.Font);
        this.emojiRepo = this.getRepository(Models.Emoji);

        // development mode setting handler
        if (this.configService.get<string>("NODE_ENV") !== "production") {
            switch (this.configService.get<string>("SERVER_DEV_RESEED_DATABASE")) {
                case "true":
                    await this.sync({ force: true });
                    await this.seedDatabase();
                    break;
                case "false":
                    await this.sync({ alter: true });
                    break;
            }
        }

        // all next for loops are for redis caching so we don't have to fetch it again to save on performance
        await this.redisService.del("blacket-session:*");

        for (const session of await this.sessionRepo.findAll() as Models.Session[]) {
            await this.redisService.set(`blacket-session:${session.userId}`, JSON.stringify(session));
        }

        for (const blook of await this.blookRepo.findAll({
            include: [
                { model: this.resourceRepo, as: "image" },
                { model: this.resourceRepo, as: "background" }
            ],
            attributes: {
                exclude: [
                    "imageId",
                    "backgroundId"
                ]
            }
        }) as Models.Blook[]) {
            await this.redisService.set(`blacket-blook:${blook.id}`, JSON.stringify({ ...blook.dataValues, image: blook.imagePath, background: blook.backgroundPath }));
        }

        for (const rarity of await this.rarityRepo.findAll() as Models.Rarity[]) {
            await this.redisService.set(`blacket-rarity:${rarity.id}`, JSON.stringify({ ...rarity.dataValues }));
        }

        for (const pack of await this.packRepo.findAll({ include: [{ model: this.resourceRepo, as: "image" }], attributes: { exclude: ["imageId"] } }) as Models.Pack[]) {
            await this.redisService.set(`blacket-pack:${pack.id}`, JSON.stringify({ ...pack.dataValues, image: pack.imagePath }));
        }

        for (const item of await this.itemRepo.findAll({ include: [{ model: this.resourceRepo, as: "image" }], attributes: { exclude: ["imageId"] } }) as Models.Item[]) {
            await this.redisService.set(`blacket-item:${item.id}`, JSON.stringify({ ...item.dataValues, image: item.imagePath }));
        }

        for (const title of await this.titleRepo.findAll() as Models.Title[]) {
            await this.redisService.set(`blacket-title:${title.id}`, JSON.stringify(title));
        }

        for (const banner of await this.bannerRepo.findAll({ include: [{ model: this.resourceRepo, as: "image" }], attributes: { exclude: ["imageId"] } }) as Models.Banner[]) {
            await this.redisService.set(`blacket-banner:${banner.id}`, JSON.stringify({ ...banner.dataValues, image: banner.imagePath }));
        }

        for (const font of await this.fontRepo.findAll({ include: [{ model: this.resourceRepo, as: "resource" }], attributes: { exclude: ["resourceId"] } }) as Models.Font[]) {
            await this.redisService.set(`blacket-font:${font.id}`, JSON.stringify({ ...font.dataValues, resource: font.resourcePath }));
        }

        for (const emoji of await this.emojiRepo.findAll({ include: [{ model: this.resourceRepo, as: "image" }], attributes: { exclude: ["imageId"] } }) as Models.Emoji[]) {
            await this.redisService.set(`blacket-emoji:${emoji.id}`, JSON.stringify({ ...emoji.dataValues, image: emoji.imagePath }));
        }
    }

    async seedDatabase() {
        // this will only run once after the database has been wiped to provide it with initial data

        const transaction = await this.transaction();

        await this.resourceRepo.create({ path: "/content/blooks/Default.png" }, { transaction }); // resource id 1
        await this.resourceRepo.create({ path: "/content/banners/Default.png" }, { transaction }); // resource id 2
        await this.resourceRepo.create({ path: "/content/fonts/Nunito.ttf" }, { transaction }); // resource id 3
        await this.resourceRepo.create({ path: "/content/fonts/Titan One.ttf" }, { transaction }); // resource id 4

        await this.roomRepo.create({ id: 0, name: "global", public: true }, { transaction });

        await this.rarityRepo.create({ name: "Common", color: "#ffffff", experience: 0, animationType: AnimationType.UNCOMMON }, { transaction });

        await this.bannerRepo.create({ name: "Default", imageId: 2 }, { transaction });

        await this.titleRepo.create({ name: "Common" }, { transaction });

        await this.blookRepo.create({ name: "Default", chance: 0, price: 0, rarityId: 1, imageId: 1, backgroundId: 1, priority: 0 }, { transaction });

        await this.fontRepo.create({ name: "Nunito", resourceId: 3 }, { transaction });
        await this.fontRepo.create({ name: "Titan One", resourceId: 4 }, { transaction });

        await transaction.commit().catch(async (error) => this.blacketLogger.error(error, "Database", "Sequelize"));
    }
}
