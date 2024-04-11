import { Column, Model, Table, DataType, HasMany } from "sequelize-typescript";
import { RoomUser, Message } from ".";

@Table({ tableName: "room" })
export default class Room extends Model<Room> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    public: boolean;

    @HasMany(() => RoomUser)
    users?: RoomUser[];

    @HasMany(() => Message, "roomId")
    messages?: Message[];
}
