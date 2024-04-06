import { Column, Model, Table, DataType, HasMany } from "sequelize-typescript";
import { Blook, Pack, Group, Banner, Emoji, Font, User, Item } from ".";

@Table({ tableName: "resource" })
export default class Resource extends Model<Resource> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    path: string;

    @HasMany(() => User, "avatarId")
    userAvatar?: User;

    @HasMany(() => User, "customAvatarId")
    customAvatar?: User;

    @HasMany(() => User, "bannerId")
    userBanner?: User;

    @HasMany(() => User, "customBannerId")
    customBanner?: User;

    @HasMany(() => Blook, "imageId")
    blookImage?: Blook;

    @HasMany(() => Blook, "backgroundId")
    blookBackgroundImage?: Blook;

    @HasMany(() => Pack, "imageId")
    packImage?: Pack;

    @HasMany(() => Group, "imageId")
    groupImage?: Group;

    @HasMany(() => Item, "imageId")
    itemImage?: Item;

    @HasMany(() => Banner, "imageId")
    bannerImage?: Banner;

    @HasMany(() => Font, "resourceId")
    fontResource?: Font;

    @HasMany(() => Emoji, "imageId")
    emojiImage?: Emoji;
}
