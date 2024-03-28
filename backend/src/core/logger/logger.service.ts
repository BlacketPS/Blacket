import { Injectable } from "@nestjs/common";
import { LoggerService } from "@nestjs/common";

@Injectable()
export class BlacketLoggerService implements LoggerService {
    log(message: any, context?: string, prefix?: string) {
        if (!prefix) prefix = "Nest";

        console.log(`\x1b[32m[${prefix}]\x1b[0m \x1b[37m${new Date().toLocaleString()}\x1b[0m \x1b[32mLOG\x1b[0m \x1b[33m[${context}]\x1b[0m \x1b[32m${message}\x1b[0m`);
    }

    info(message: any, context?: string, prefix?: string) {
        if (!prefix) prefix = "Nest";

        console.info(`\x1b[32m[${prefix}]\x1b[0m \x1b[37m${new Date().toLocaleString()}\x1b[0m \x1b[32mINFO\x1b[0m \x1b[33m[${context}]\x1b[0m \x1b[32m${message}\x1b[0m`);
    }

    warn(message: any, context?: string, prefix?: string) {
        if (!prefix) prefix = "Nest";

        console.warn(`\x1b[33m[${prefix}]\x1b[0m \x1b[37m${new Date().toLocaleString()}\x1b[0m \x1b[33mWARN\x1b[0m \x1b[33m[${context}]\x1b[0m \x1b[33m${message}\x1b[0m`);
    }

    error(message: any, trace?: string, context?: string, prefix?: string) {
        if (!prefix) prefix = "Nest";

        console.error(`\x1b[31m[${prefix}]\x1b[0m \x1b[37m${new Date().toLocaleString()}\x1b[0m \x1b[31mERROR\x1b[0m \x1b[33m[${context}]\x1b[0m \x1b[31m${message}\x1b[0m`, trace);
    }

    debug(message: any, context?: string, prefix?: string) {
        if (!prefix) prefix = "Nest";

        console.debug(`\x1b[36m[${prefix}]\x1b[0m \x1b[37m${new Date().toLocaleString()}\x1b[0m \x1b[36mDEBUG\x1b[0m \x1b[33m[${context}]\x1b[0m \x1b[36m${message}\x1b[0m`);
    }

    verbose(message: any, context?: string, prefix?: string) {
        if (!prefix) prefix = "Nest";

        console.log(`\x1b[34m[${prefix}]\x1b[0m \x1b[37m${new Date().toLocaleString()}\x1b[0m \x1b[34mVERBOSE\x1b[0m \x1b[33m[${context}]\x1b[0m \x1b[34m${message}\x1b[0m`);
    }
}
