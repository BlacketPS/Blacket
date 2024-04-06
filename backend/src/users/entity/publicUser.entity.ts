import { Exclude } from "class-transformer";

export class PublicUser {
    id: string;

    @Exclude()
    password: string;

    @Exclude()
    ipAddress: string;

    constructor(partial: Partial<PublicUser>) {
        Object.assign(this, partial);
    }
}
