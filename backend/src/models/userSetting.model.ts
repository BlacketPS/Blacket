import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from ".";

export enum FriendRequestSetting {
    ON = 1,
    OFF = 2,
    MUTUAL = 3
}

@Table({ tableName: "user_setting", timestamps: false })
export default class UserSetting extends Model<UserSetting> {
    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false, primaryKey: true })
    declare id: string;

    @BelongsTo(() => User)
    user: User;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    openPacksInstantly: boolean;

    @Column({
        type: DataType.INTEGER,
        validate: { isIn: { args: [Object.values(FriendRequestSetting)], msg: `friendRequests must be one of these values: ${Object.keys(FriendRequestSetting).join(", ")}` } },
        defaultValue: FriendRequestSetting.ON,
        allowNull: false
    })
    friendRequests: FriendRequestSetting;

    @Column({ type: DataType.JSON, allowNull: false, defaultValue: [] })
    categoriesClosed: string[];

    @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
    otpSecret: string;
}
