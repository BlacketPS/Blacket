import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import IpAddress from "./ipAddress.model";

@Table({ tableName: "user_ip" })
export default class UserIp extends Model<UserIp> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => IpAddress)
    @Column({ type: DataType.INTEGER })
    ipId: number;

    @BelongsTo(() => IpAddress)
    ip: IpAddress;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    uses: number;
}
