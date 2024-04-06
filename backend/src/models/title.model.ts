import { Column, Model, Table, DataType } from "sequelize-typescript";

@Table({ tableName: "title" })
export default class Title extends Model<Title> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    priority: number;
}
