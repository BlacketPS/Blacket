import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { randomUUID } from "crypto";
import { User } from "./user.model";

@Table({ tableName: "sessions", timestamps: false })
export class Session extends Model<Session> {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        defaultValue: () => randomUUID()
    })
    declare id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    createdAt: Date;
}
