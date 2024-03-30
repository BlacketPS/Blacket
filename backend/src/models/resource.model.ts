import { Column, Model, Table, DataType, HasOne, HasMany } from "sequelize-typescript";
import { Blook, Group, User } from ".";

@Table({ tableName: "resource", timestamps: false })
export default class Resource extends Model<Resource> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({
        type: DataType.STRING
    })
    path: string;

    @HasOne(() => Blook, "imageId")
    blookImage?: Blook;

    @HasOne(() => Blook, "backgroundId")
    blookBackgroundImage?: Blook;

    @HasOne(() => Group)
    groupImage?: Group;

    @HasMany(() => User, "avatarId")
    userAvatar?: User;

    @HasOne(() => User, "customAvatarId")
    customAvatar?: User;

    @HasMany(() => User, "bannerId")
    userBanner?: User;

    @HasOne(() => User, "customBannerId")
    customBanner?: User;
}
