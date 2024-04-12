import { Exclude } from "class-transformer";

export class GetFormEntity {
    id: string;

    @Exclude()
    password: string;

    @Exclude()
    ipAddress: string;

    @Exclude()
    accepterId: string;

    constructor(partial: Partial<GetFormEntity>) {
        Object.assign(this, partial);
    }
}
