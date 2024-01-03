import { DataTypes } from "sequelize";

export default {
    name: "UserBadge",
    attributes: {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => (Math.floor(Date.now() / 1000)).toString() + Math.floor(1000000 + Math.random() * 9000000).toString()
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