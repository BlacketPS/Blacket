import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { BlacketLoggerService } from "./core/logger/logger.service";

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

    app.setGlobalPrefix("/api");

    await app.listen(3000);
}

bootstrap();
