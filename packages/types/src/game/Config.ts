export enum Mode {
    DEV,
    STAGING,
    PROD
}

export interface Config {
    version: string;
    mode: Mode;
}
