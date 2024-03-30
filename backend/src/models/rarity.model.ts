import { Column, Model, Table, DataType, HasMany } from "sequelize-typescript";
import Blook from "./blook.model";

@Table({ tableName: "rarity", timestamps: false })
export default class Rarity extends Model<Rarity> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
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
        allowNull: false
    })
    experience: string;

    @HasMany(() => Blook)
    blooks: Blook[];
}

// we're not gonna have extra wait time, there's no need, its just for client visuals
// same with pack opening, that can be handled by the client instead of having a weird extra field here
