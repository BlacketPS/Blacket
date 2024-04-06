import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Resource } from ".";

@Table({ tableName: "emoji" })
export default class Emoji extends Model<Emoji> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @ForeignKey(() => Resource)
    @Column({ type: DataType.INTEGER, allowNull: false })
    imageId: number;

    @BelongsTo(() => Resource, "imageId")
    image: Resource;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    priority: number;

    get imagePath(): string {
        return this.image.path;
    }
}
