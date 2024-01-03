import { DataTypes } from "sequelize";

export default {
    name: "ClaimedDailyReward",
    attributes: {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "users",
                key: "id"
            }
        }
    },
    options: {
        indexes: [{ unique: true, fields: ["user"] }],
        tableName: "claimed_daily_rewards"
    }
}