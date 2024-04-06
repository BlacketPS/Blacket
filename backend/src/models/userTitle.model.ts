import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User, Title } from ".";

@Table({ tableName: "user_title" })
export default class UserTitle extends Model<UserTitle> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false })
    userId: string;

    @BelongsTo(() => User, "userId")
    user: User;

    @ForeignKey(() => Title)
    @Column({ type: DataType.INTEGER, allowNull: false })
    titleId: number;

    @BelongsTo(() => Title, "titleId")
    title: Title;
}
