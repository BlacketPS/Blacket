import { DataTypes } from "sequelize";

export default {
    name: "UserBadge",
    attributes: {
        id: {
            type: DataTypes.STRING,
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
    }
}