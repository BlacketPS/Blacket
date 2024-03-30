import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import Blook from "./blook.model";

@Table({ tableName: "user_blook" })
export default class UserBlook extends Model<UserBlook> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING })
    userId: string;

    @BelongsTo(() => User, "userId")
    user: User;

    @ForeignKey(() => Blook)
    @Column({ type: DataType.INTEGER })
    blookId: number;

    @BelongsTo(() => Blook)
    blook: Blook;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING })
    initalObtainerId: string;

    @BelongsTo(() => User, "initalObtainerId")
    initialObtainer: User;
}
