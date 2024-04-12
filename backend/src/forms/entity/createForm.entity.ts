import { Exclude } from "class-transformer";

export class CreateFormEntity {
    id: string;

    @Exclude()
    password: string;

    @Exclude()
    ipAddress: string;

    @Exclude()
    accepterId: string;

    constructor(partial: Partial<CreateFormEntity>) {
        Object.assign(this, partial);
    }
}
