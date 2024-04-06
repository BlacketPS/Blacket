import { Column, Model, Table, DataType, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Item, Blook, User, AuctionBid } from ".";

export enum AuctionType {
    ITEM = 1,
    BLOOK = 2
}

@Table({ tableName: "auction" })
export default class Auction extends Model<Auction> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: { isIn: { args: [Object.values(AuctionType)], msg: `auctionType must be one of: ${Object.values(AuctionType).join(", ")}` } }
    })
    type: AuctionType;

    @ForeignKey(() => Item)
    @Column({ type: DataType.INTEGER, allowNull: true })
    itemId: number;

    @BelongsTo(() => Item, "itemId")
    item: Item;

    @ForeignKey(() => Blook)
    @Column({ type: DataType.INTEGER, allowNull: true })
    blookId: number;

    @BelongsTo(() => Blook, "blookId")
    blook: Blook;

    @Column({ type: DataType.INTEGER, allowNull: false })
    price: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false })
    sellerId: string;

    @BelongsTo(() => User, "sellerId")
    seller: User;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    buyItNow: boolean;

    @Column({ type: DataType.DATE, allowNull: false })
    expiresAt: Date;

    @HasMany(() => AuctionBid)
    bids?: AuctionBid[];
}
