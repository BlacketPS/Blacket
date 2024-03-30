import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisService } from "src/redis/redis.service";
import { Sequelize } from "sequelize-typescript";
import { BlacketLoggerService } from "src/core/logger/logger.service";
import * as Models from "src/models";

@Injectable()
export class SequelizeService extends Sequelize {
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
            models: Object.values(Models),
            repositoryMode: true,
            logging: configService.get<string>("NODE_ENV") === "production" ? false : (msg) => blacketLogger.debug(msg, "Database", "Sequelize")
        });
    }

    async onModuleInit() {
        if (this.configService.get<string>("NODE_ENV") !== "production") {
            await this.sync({ force: true });

            await this.seedDatabase();
        }

        const sessionRepo = this.getRepository(Models.Session);

        for (const session of await sessionRepo.findAll()) {
            await this.redisService.set(`blacket-session:${session.userId}`, JSON.stringify(session));
        }
    }

    async seedDatabase() {
        // add database seeding code here, this is only run when after the database has been wiped to provide it with initial data

        const resourceRepo = this.getRepository(Models.Resource);

        const transaction = await this.transaction();

        await resourceRepo.create({ path: "/content/blooks/Default.png" }, { transaction });
        await resourceRepo.create({ path: "/content/banners/Default.png" }, { transaction });

        await transaction.commit().catch(async (error) => this.blacketLogger.error(error, "Database", "Sequelize"));
    }
}
