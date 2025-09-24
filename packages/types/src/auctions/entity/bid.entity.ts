import { Exclude } from "class-transformer";
import { PublicUser } from "../../users";

export class AuctionsBidEntity {
    id: number;

    @Exclude()
    auctionId: number = undefined;

    @Exclude()
    userId: string = undefined;

    amount: number;

    createdAt: Date;
    updatedAt: Date;

    user: PublicUser;

    constructor(partial: Partial<AuctionsBidEntity>) {
        Object.assign(this, partial);

        this.auctionId = undefined;
        this.userId = undefined;

        this.user = new PublicUser(partial.user);
    }
}

