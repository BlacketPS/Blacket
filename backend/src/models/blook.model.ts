import { Column, Model, Table, DataType, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Rarity, Resource, Pack, Auction } from ".";

@Table({ tableName: "blook" })
export default class Blook extends Model<Blook> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @Column({ type: DataType.DOUBLE, allowNull: false, defaultValue: 0 })
    chance: number;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    price: number;

    @ForeignKey(() => Rarity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    rarityId: number;

    @BelongsTo(() => Rarity)
    rarity: Rarity;

    @ForeignKey(() => Resource)
    @Column({ type: DataType.INTEGER, allowNull: false })
    imageId: number;

    @BelongsTo(() => Resource, "imageId")
    image: Resource;

    @ForeignKey(() => Resource)
    @Column({ type: DataType.INTEGER, allowNull: false })
    backgroundId: number;

    @BelongsTo(() => Resource, "backgroundId")
    background: Resource;

    @ForeignKey(() => Pack)
    @Column({ type: DataType.INTEGER, allowNull: true })
    packId: number;

    @BelongsTo(() => Pack)
    pack?: Pack;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    priority: number;

    @HasMany(() => Auction)
    auctions?: Auction[];

    get imagePath(): string {
        return this.image.path;
    }

    get backgroundPath(): string {
        return this.background.path;
    }
}
