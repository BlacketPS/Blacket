import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import Rarity from "./rarity.model";
import Resource from "./resource.model";

@Table({ tableName: "blook", timestamps: true })
export default class Blook extends Model<Blook> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    })
    chance: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    })
    price: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    })
    priority: number;

    @ForeignKey(() => Rarity)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    rarityId: number;

    @BelongsTo(() => Rarity)
    rarity: Rarity;

    @ForeignKey(() => Resource)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    imageId: number;

    @BelongsTo(() => Resource, "imageId")
    image: Resource;

    @ForeignKey(() => Resource)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    backgroundId: number;

    @BelongsTo(() => Resource, "backgroundId")
    background: Resource;
}
