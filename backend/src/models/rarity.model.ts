import { Column, Model, Table, DataType, HasMany } from "sequelize-typescript";
import { Blook } from ".";

export enum AnimationType {
    UNCOMMON = 1,
    RARE = 2,
    EPIC = 3,
    LEGENDARY = 4,
    CHROMA = 5
}

@Table({ tableName: "rarity" })
export default class Rarity extends Model<Rarity> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            is: /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$|^rainbow$/
        }
    })
    color: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: { isIn: { args: [Object.values(AnimationType)], msg: `animationType must be one of these values: ${Object.keys(AnimationType).join(", ")}` } }
    })
    animationType: AnimationType;

    @Column({ type: DataType.INTEGER, allowNull: false })
    experience: number;

    @HasMany(() => Blook)
    blooks: Blook[];
}
