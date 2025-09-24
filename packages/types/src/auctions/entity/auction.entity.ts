import { Exclude } from "class-transformer";
import { AuctionType, UserBlook, UserItem } from "../../interfaces";
import { AuctionsBidEntity } from ".";
import { PublicUser } from "../../users";

export class AuctionsAuctionEntity {
    id: number;

    @Exclude()
    sellerId?: string = undefined;

    @Exclude()
    buyerId?: string = undefined;

    @Exclude()
    itemId: number = undefined;

    @Exclude()
    delistedAt?: Date;

    item?: UserItem;

    blook?: UserBlook;

    type: AuctionType;

    price: number;

    seller: PublicUser;

    buyItNow: boolean;

    bids: AuctionsBidEntity[];

    expiresAt: Date;

    constructor(partial: Partial<AuctionsAuctionEntity>) {
        Object.assign(this, partial);

        this.itemId = undefined;
        this.sellerId = undefined;
        this.seller = new PublicUser(partial.seller);
        this.buyerId = undefined;

        if (partial.bids) this.bids = partial.bids.map((bid) => new AuctionsBidEntity(bid));
    }
}

