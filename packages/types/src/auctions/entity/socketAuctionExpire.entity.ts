import { AuctionType, UserBlook, UserItem } from "../../interfaces";

export class SocketAuctionExpireEntity {
    id: number;

    type: AuctionType;

    blook?: Partial<UserBlook>;
    item?: Partial<UserItem>;

    sellerId: string;
    buyerId?: string;

    price: number;

    buyItNow?: boolean;

    constructor(partial: Partial<SocketAuctionExpireEntity>) {
        Object.assign(this, partial);
    }
}

