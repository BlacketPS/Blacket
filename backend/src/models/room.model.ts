/*
import { DataTypes } from "sequelize";

export default {
    name: "Room",
    attributes: {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        public: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    options: {
        tableName: "rooms"
    }
}*/

import { Column, Model, Table, DataType, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { RoomUser } from ".";

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
}
