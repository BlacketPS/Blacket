import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Group, User } from ".";

@Table({ tableName: "user_group" })
export default class UserGroup extends Model<UserGroup> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @ForeignKey(() => Group)
    @Column({ type: DataType.INTEGER, allowNull: false })
    groupId: number;

    @BelongsTo(() => Group)
    group: Group;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false })
    userId: string;

    @BelongsTo(() => User)
    user: User;
}
