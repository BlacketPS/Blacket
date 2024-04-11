import { NestFactory } from "@nestjs/core";
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

    await app.listen(
        // replace number below with your own port
        3000
    );
}

bootstrap();
