enum Environment {
    development = "development",
    production = "production"
}

enum PayPalMode {
    sandbox = "sandbox",
    live = "live"
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: Environment;

            SERVER_PORT: number;

            SERVER_DATABASE_HOST: string;
            SERVER_DATABASE_PORT: number;
            SERVER_DATABASE_USER: string;
            SERVER_DATABASE_PASSWORD: string;
            SERVER_DATABASE_NAME: string;

            SERVER_REDIS_HOST: string;
            SERVER_REDIS_PORT: number;
            SERVER_REDIS_PASSWORD: string;

            SERVER_PAYPAL_MODE: PayPalMode;
            SERVER_PAYPAL_CLIENT_ID: string;
            SERVER_PAYPAL_CLIENT_SECRET: string;

            SERVER_ACCESS_CODE: string;
            SERVER_BLOCK_PROXIES: boolean;
            SERVER_ALLOW_MULTIPLE_ACCOUNTS: boolean;
            SERVER_BACKUP_ENABLED: boolean;

            SERVER_DEV_RESEED_DATABASE: boolean;
        }
    }
}

export { };
