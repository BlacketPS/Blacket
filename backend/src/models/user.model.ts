import { Column, Model, Table, DataType, HasOne, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Session, Resource, UserStatistic, UserSetting, UserGroup, UserPunishment } from ".";

@Table({ tableName: "users", timestamps: true })
export default class User extends Model<User> {
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

    @ForeignKey(() => Resource)
    @Column({
        type: DataType.INTEGER
    })
    avatarId: number;

    @BelongsTo(() => Resource, "avatarId")
    avatar: Resource;

    @ForeignKey(() => Resource)
    @Column({
        type: DataType.INTEGER
    })
    customAvatarId: number;

    @BelongsTo(() => Resource, "customAvatarId")
    customAvatar?: Resource;

    @ForeignKey(() => Resource)
    @Column({
        type: DataType.INTEGER
    })
    bannerId: number;

    @BelongsTo(() => Resource, "bannerId")
    banner: Resource;

    @ForeignKey(() => Resource)
    @Column({
        type: DataType.INTEGER
    })
    customBannerId: number;

    @BelongsTo(() => Resource, "customBannerId")
    customBanner?: Resource;

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
        type: DataType.DATE,
        allowNull: true,
        defaultValue: null
    })
    lastClaimed: Date;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    ipAddress: string;

    @HasOne(() => Session)
    session: Session;

    @HasOne(() => UserStatistic)
    statistics: UserStatistic;

    @HasOne(() => UserSetting)
    settings: UserSetting;

    @HasMany(() => UserGroup)
    groups?: UserGroup[];

    @HasMany(() => UserPunishment, "userId")
    punishments?: UserPunishment[];

    @HasMany(() => UserPunishment, "staffId")
    punishmentActions?: UserPunishment[];
}
