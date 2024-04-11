import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from ".";

export enum RelationType {
    ADD = 1,
    BLOCK = 2
}

// mutual adding === friends
// to keep track of a user you can add them making it easier to find their profile

@Table({ tableName: "user_relationship" })
export default class UserRelationship extends Model<UserRelationship> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false })
    userId: string;

    @BelongsTo(() => User, "userId")
    user: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false })
    targetId: string;

    @BelongsTo(() => User, "targetId")
    target: User;

    @Column({
        type: DataType.STRING
    })
    friendNickname: string;

    @Column({
        type: DataType.INTEGER,
        validate: { isIn: { args: [Object.values(RelationType)], msg: `Relationship type must be one of these values: ${Object.values(RelationType).join(", ")}` } },
        allowNull: false
    })
    type: RelationType;
}
