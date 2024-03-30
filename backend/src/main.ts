import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { BlacketLoggerService } from "./core/logger/logger.service";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: new BlacketLoggerService() });

    app.enableCors({
        origin: [
            /* TO CONFIG, PUT YOUR OWN DOMAIN HERE INCLUDE HTTP[S]:// */
            "https://rewrite.blacket.org",
            "https://blacket.org"
        ],
        credentials: true
    });

    app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }));

    app.setGlobalPrefix("/api");

    useContainer(app.select(AppModule), {fallbackOnErrors: true});

    await app.listen(3000);
}

bootstrap();
