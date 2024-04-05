import { Column, Model, Table, DataType, HasOne } from "sequelize-typescript";
import { Blook, Pack, Group, Banner, Emoji, User, Item } from ".";

@Table({ tableName: "resource" })
export default class Resource extends Model<Resource> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    path: string;

    @HasOne(() => User, "avatarId")
    userAvatar?: User;

    @HasOne(() => User, "customAvatarId")
    customAvatar?: User;

    @HasOne(() => User, "bannerId")
    userBanner?: User;

    @HasOne(() => User, "customBannerId")
    customBanner?: User;

    @HasOne(() => Blook, "imageId")
    blookImage?: Blook;

    @HasOne(() => Blook, "backgroundId")
    blookBackgroundImage?: Blook;

    @HasOne(() => Pack, "imageId")
    packImage?: Pack;

    @HasOne(() => Group, "imageId")
    groupImage?: Group;

    @HasOne(() => Item, "imageId")
    itemImage?: Item;

    @HasOne(() => Banner, "imageId")
    bannerImage?: Banner;

    @HasOne(() => Emoji, "imageId")
    emojiImage?: Emoji;
}
