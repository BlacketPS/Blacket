import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Resource, UserGroup } from ".";

@Table({ tableName: "group", timestamps: false })
export default class Group extends Model<Group> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: 0 })
    permissions: number;

    @ForeignKey(() => Resource)
    @Column({ type: DataType.INTEGER })
    imageId: number;

    @BelongsTo(() => Resource, "imageId")
    image: Resource;

    @HasMany(() => UserGroup)
    userGroups?: UserGroup[];

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    priority: number;
}
