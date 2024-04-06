import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User, Banner } from ".";

@Table({ tableName: "user_banner" })
export default class UserBanner extends Model<UserBanner> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false })
    userId: string;

    @BelongsTo(() => User, "userId")
    user: User;

    @ForeignKey(() => Banner)
    @Column({ type: DataType.INTEGER, allowNull: false })
    bannerId: number;

    @BelongsTo(() => Banner, "bannerId")
    banner: Banner;
}
