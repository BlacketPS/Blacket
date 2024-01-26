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
                isIn: [["on", "mutual", "off"]]
            },
            defaultValue: "on"
        },
        otpSecret: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    },
    options: {
        indexes: [{ unique: true, fields: ["user"] }],
        tableName: "user_settings"
    },
    relations: [
        { type: "belongsTo", model: "User", options: { foreignKey: "user", as: "userData" } }
    ]
}