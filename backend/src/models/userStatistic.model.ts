import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from ".";

@Table({ tableName: "user_statistic", timestamps: false })
export default class UserStatistic extends Model<UserStatistic> {
    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false, primaryKey: true })
    declare id: string;

    @BelongsTo(() => User)
    user: User;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    packsOpened: number;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    messagesSent: number;
}
