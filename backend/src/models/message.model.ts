import { Column, Model, Table, DataType, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { User, Room } from ".";

@Table({ tableName: "message" })
export default class Message extends Model<Message> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false })
    authorId: string;

    @BelongsTo(() => User, "authorId")
    author: User;

    @ForeignKey(() => Room)
    @Column({ type: DataType.INTEGER, allowNull: false })
    roomId: number;

    @BelongsTo(() => Room, "roomId")
    room: Room;

    @Column({ type: DataType.TEXT, allowNull: false })
    content: string;

    @Column({ type: DataType.JSON, allowNull: false, defaultValue: [] })
    mentions: string[];

    @ForeignKey(() => Message)
    @Column({ type: DataType.INTEGER, allowNull: true })
    replyingToId: number;

    @BelongsTo(() => Message)
    replyingTo: Message;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    edited: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    deleted: boolean;

    @HasMany(() => Message)
    replies: Message[];
}
