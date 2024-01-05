import { DataTypes } from "sequelize";

export default {
    name: "UserSetting",
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
        openPacksInstantly: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        friendRequests: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["on", "mutuals", "off"]]
            },
            defaultValue: "on"
        }
    },
    options: {
        tableName: "user_settings"
    }
}