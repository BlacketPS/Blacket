import { Exclude } from "class-transformer";
import { Resource, Blook } from "src/models";

export class PublicUser {
    id: string;

    avatar: string | Resource;
    banner: string | Resource;

    customAvatar: string | Resource | null;
    customBanner: string | Resource | null;

    blooks: object | Blook[];

    @Exclude()
    password: string;

    @Exclude()
    ipAddress: string;

    constructor(partial: Partial<PublicUser>) {
        Object.assign(this, partial);

        this.avatar = (this.avatar as Resource).path;
        this.banner = (this.banner as Resource).path;

        this.password = undefined;
        this.ipAddress = undefined;

        this.customAvatar = (this.customAvatar as Resource)?.path ?? null;
        this.customBanner = (this.customBanner as Resource)?.path ?? null;

        this.blooks = (this.blooks as Blook[]).flatMap((blook) => blook.id).reduce((acc, curr) => {
            const key = String(curr);

            return { ...acc, [key]: acc[key] ? ++acc[key] : 1 };
        }, {});
    }
}
