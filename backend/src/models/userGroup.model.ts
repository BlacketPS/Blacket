import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Group from "./group.model";
import User from "./user.model";

@Table({ tableName: "user_group" })
export default class UserGroup extends Model<UserGroup> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => Group)
    @Column({ type: DataType.INTEGER })
    groupId: number;

    @BelongsTo(() => Group)
    group: Group;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING })
    userId: string;

    @BelongsTo(() => User)
    user: User;
}
