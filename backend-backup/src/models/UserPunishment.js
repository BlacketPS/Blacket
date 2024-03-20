import { DataTypes } from "sequelize";

export default {
    name: "UserPunishment",
    attributes: {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["mute", "ban", "blacklist"]]
            }
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "no reason specified"
        },
        punishedBy: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    options: {
        tableName: "user_punishments"
    },
    relations: [
        {
            type: "belongsTo",
            model: "User",
            options: {
                foreignKey: "user",
                as: "userData"
            }
        },
        {
            type: "belongsTo",
            model: "User",
            options: {
                foreignKey: "punishedBy",
                as: "punishedByData"
            }
        },
        {
            type: "hasOne",
            model: "UserBan",
            options: {
                foreignKey: "punishment",
                as: "banData"
            }
        },
        {
            type: "hasOne",
            model: "UserMute",
            options: {
                foreignKey: "punishment",
                as: "muteData"
            }
        }
    ]
}