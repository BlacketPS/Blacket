import { Column, Model, Table, DataType, HasMany } from "sequelize-typescript";
import UserIp from "./userIp.model";

@Table({ tableName: "ip_address" })
export default class IpAddress extends Model<IpAddress> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.STRING })
    ip: string;

    @HasMany(() => UserIp)
    users?: UserIp[];
}
