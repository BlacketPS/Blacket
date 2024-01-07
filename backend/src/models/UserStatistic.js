import { DataTypes } from "sequelize";

export default {
    name: "UserStatistic",
    attributes: {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "users",
                key: "id"
            }
        },
        packsOpened: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        messagesSent: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        }
    },
    options: {
        indexes: [{ unique: true, fields: ["user"] }],
        tableName: "user_statistics"
    }
}