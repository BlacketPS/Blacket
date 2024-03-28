import { Column, Model, Table, DataType, HasOne } from "sequelize-typescript";
import { Session } from "./session.model";

@Table({ tableName: "users", timestamps: true })
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        defaultValue: () => (Math.floor(Date.now() / 1000)).toString() + Math.floor(1000000 + Math.random() * 9000000).toString()
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    username: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    password: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    avatar: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    banner: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        defaultValue: "Common"
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    font: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        defaultValue: "#ffffff",
        validate: {
            is: /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$|^rainbow$/
        }
    })
    color: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    })
    tokens: number;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    })
    experience: number;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        defaultValue: 0
    })
    permissions: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    ipAddress: string;

    @HasOne(() => Session)
    session: Session;
}
