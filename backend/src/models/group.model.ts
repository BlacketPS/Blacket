import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import Resource from "./resource.model";
import UserGroup from "./userGroup.model";

@Table({ tableName: "group", timestamps: false })
export default class Group extends Model<Group> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull:false })
    name: string;

    @Column({ type: DataType.STRING, allowNull:false })
    description: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        defaultValue: 0
    })
    permissions: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    priority: number;

    @ForeignKey(() => Resource)
    @Column({ type: DataType.INTEGER })
    imageId: number;

    @BelongsTo(() => Resource)
    image: Resource;

    @HasMany(() => UserGroup)
    userGroups?: UserGroup[];
}
