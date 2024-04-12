import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

import { BlacketLoggerService } from "./core/logger/logger.service";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: new BlacketLoggerService() });

    app.enableCors({
        origin: [
            /* to config, put your own domain here include http[s]:// */
            "https://rewrite.blacket.org",
            "https://blacket.org"
        ],
        credentials: true
    });

    app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }));

    app.setGlobalPrefix("/api");

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    const configService = app.get(ConfigService);

    await app.listen(configService.get<number>("SERVER_PORT"));
}

bootstrap();
