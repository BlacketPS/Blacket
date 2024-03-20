import { DataTypes } from "sequelize";

export default {
    name: "UserMute",
    attributes: {
        punishment: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "user_punishments",
                key: "id"
            }
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        }
    },
    options: {
        indexes: [{ unique: true, fields: ["user"] }],
        tableName: "user_mutes"
    },
    relations: [
        {
            type: "belongsTo",
            model: "UserPunishment",
            options: {
                foreignKey: "punishment",
                as: "punishmentData"
            }
        },
        {
            type: "belongsTo",
            model: "User",
            options: {
                foreignKey: "user",
                as: "userData"
            }
        }
    ]
}