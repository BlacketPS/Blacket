import { Exclude } from "class-transformer";

export class CreateForm {
    id: string;

    @Exclude()
    password: string;

    @Exclude()
    ipAddress: string;

    @Exclude()
    accepterId: string;

    constructor(partial: Partial<CreateForm>) {
        Object.assign(this, partial);
    }
}
