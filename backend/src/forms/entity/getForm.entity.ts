import { Exclude } from "class-transformer";

export class GetForm {
    id: string;

    @Exclude()
    password: string;

    @Exclude()
    ipAddress: string;

    @Exclude()
    accepterId: string;

    constructor(partial: Partial<GetForm>) {
        Object.assign(this, partial);
    }
}
