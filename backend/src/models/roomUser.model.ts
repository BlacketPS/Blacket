import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Room, User } from ".";

@Table({ tableName: "room_user" })
export default class RoomUser extends Model<RoomUser> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @ForeignKey(() => Room)
    @Column({ type: DataType.INTEGER, allowNull: false })
    roomId: number;

    @BelongsTo(() => Room)
    room: Room;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false })
    userId: string;

    @BelongsTo(() => User)
    user: User;
}
