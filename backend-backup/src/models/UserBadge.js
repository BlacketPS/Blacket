import { DataTypes } from "sequelize";

export default {
    name: "UserBadge",
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
        badge: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "badges",
                key: "id"
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        grantedBy: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        }
    },
    options: {
        tableName: "user_badges"
    },
    relations: [
        { type: "belongsTo", model: "User", options: { foreignKey: "user", as: "userData" } },
        { type: "belongsTo", model: "Badge", options: { foreignKey: "badge", as: "badgeData" } },
        { type: "belongsTo", model: "User", options: { foreignKey: "grantedBy", as: "grantedByData" } }
    ]
}