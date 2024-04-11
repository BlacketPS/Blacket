import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from ".";

import { randomUUID } from "crypto";

export enum AcceptStatus {
    PENDING = 1,
    ACCEPTED = 2,
    DENIED = 3
};

@Table({ tableName: "form" })
export default class Form extends Model<Form> {
    @Column({ type: DataType.STRING, primaryKey: true, defaultValue: () => randomUUID() })
    declare id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    username: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING, allowNull: false })
    ipAddress: string;

    @Column({ type: DataType.STRING, allowNull: false })
    reasonToPlay: string;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: AcceptStatus.PENDING })
    acceptStatus: AcceptStatus;

    @Column({ type: DataType.STRING, allowNull: true })
    deniedReason: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: true })
    accepterId: string;

    @BelongsTo(() => User, "accepterId")
    accepter: User;
}
