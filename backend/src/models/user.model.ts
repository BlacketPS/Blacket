import { Column, Model, Table, DataType, HasOne, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { History, Resource, Session, UserBlook, UserGroup, UserPunishment, UserRelationship, UserSetting, UserStatistic, UserIpAddress, Auction, Title, UserTitle, UserBanner, Font, Message, Form } from ".";

@Table({ tableName: "user" })
export default class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        defaultValue: () => (Math.floor(Date.now() / 1000)).toString() + Math.floor(1000000 + Math.random() * 9000000).toString()
    })
    declare id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    username: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    password: string;

    @ForeignKey(() => Resource)
    @Column({ type: DataType.INTEGER, allowNull: false })
    avatarId: number;

    @BelongsTo(() => Resource, "avatarId")
    avatar: Resource;

    @ForeignKey(() => Resource)
    @Column({ type: DataType.INTEGER, allowNull: true })
    customAvatarId: number;

    @BelongsTo(() => Resource, "customAvatarId")
    customAvatar?: Resource;

    @ForeignKey(() => Resource)
    @Column({ type: DataType.INTEGER, allowNull: false })
    bannerId: number;

    @BelongsTo(() => Resource, "bannerId")
    banner: Resource;

    @ForeignKey(() => Resource)
    @Column({ type: DataType.INTEGER, allowNull: true })
    customBannerId: number;

    @BelongsTo(() => Resource, "customBannerId")
    customBanner?: Resource;

    @ForeignKey(() => Title)
    @Column({ type: DataType.INTEGER, allowNull: false })
    titleId: number;

    @BelongsTo(() => Title)
    title: Title;

    @ForeignKey(() => Font)
    @Column({ type: DataType.INTEGER, allowNull: false })
    fontId: number;

    @BelongsTo(() => Font)
    font: Font;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        defaultValue: "#ffffff",
        validate: {
            is: /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$|^rainbow$/
        }
    })
    color: string;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    tokens: number;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    experience: number;

    @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: 0 })
    permissions: number;

    @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
    lastClaimed: Date;

    @Column({ type: DataType.STRING, allowNull: true })
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

    @HasMany(() => Form, "accepterId")
    acceptedForms?: Form[];

    @HasMany(() => UserBlook, "userId")
    blooks?: UserBlook[];

    @HasMany(() => UserTitle, "userId")
    titles?: UserTitle[];

    @HasMany(() => UserBanner, "userId")
    banners?: UserBanner[];

    @HasMany(() => Auction, "sellerId")
    auctions?: Auction[];

    @HasMany(() => UserBlook, "initalObtainerId")
    initiallyObtainedBlooks?: UserBlook[];

    @HasMany(() => History, "previousOwnerId")
    involvedPreviousOwnerHistory?: History[];

    @HasMany(() => History, "newOwnerId")
    involvedNewOwnerHistory?: History[];

    @HasMany(() => Message, "userId")
    messages?: Message[];

    @HasMany(() => UserRelationship, "userId")
    usersAdded?: UserRelationship[];

    @HasMany(() => UserRelationship, "targetId")
    addedByUsers?: UserRelationship[];

    @HasMany(() => UserIpAddress)
    ipAddresses?: UserIpAddress[];

    get avatarPath(): string {
        return this.avatar.path;
    }

    get customAvatarPath(): string {
        return this.customAvatar?.path;
    }

    get bannerPath(): string {
        return this.banner.path;
    }

    get customBannerPath(): string {
        return this.customBanner?.path;
    }
}
