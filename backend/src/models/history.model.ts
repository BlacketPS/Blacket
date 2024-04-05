import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from ".";

export enum HistoryType {
    UNKNOWN = 1,
    TRADE = 2,
    AUCTION = 3,
    BAZAAR = 4
}

@Table({ tableName: "history" })
export default class History extends Model<History> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING })
    previousOwnerId: string;

    @BelongsTo(() => User, "previousOwnerId")
    previousOwner: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING })
    newOwnerId: string;

    @BelongsTo(() => User, "newOwnerId")
    newOwner: User;

    @Column({
        type: DataType.INTEGER,
        validate: { isIn: { args: [Object.values(HistoryType)], msg: `type must be one of these values: ${Object.keys(HistoryType).join(", ")}` } },
        defaultValue: HistoryType.UNKNOWN,
        allowNull: false
    })
    type: HistoryType;
}
