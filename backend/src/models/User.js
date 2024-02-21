import { DataTypes } from "sequelize";

export default {
    name: "User",
    attributes: {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => (Math.floor(Date.now() / 1000)).toString() + Math.floor(1000000 + Math.random() * 9000000).toString()
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        banner: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "Common"
        },
        font: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        color: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "#ffffff",
            validate: {
                is: /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$|^rainbow$/
            }
        },
        tokens: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        experience: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        permissions: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        modifiedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    options: {
        indexes: [{ unique: true, fields: ["username"] }],
        tableName: "users"
    },
    relations: [
        { type: "hasMany", model: "UserBadge", options: { foreignKey: "user", as: "badges" } },
        { type: "hasMany", model: "UserBlook", options: { foreignKey: "user", as: "blooks" } },
        { type: "hasOne", model: "UserStatistic", options: { foreignKey: "user", as: "statistics" } },
        { type: "hasOne", model: "UserSetting", options: { foreignKey: "user", as: "settings" } },
        { type: "hasOne", model: "UserMute", options: { foreignKey: "user", as: "mute" } },
        { type: "hasOne", model: "UserBan", options: { foreignKey: "user", as: "ban" } },
        { type: "hasOne", model: "Session", options: { foreignKey: "user", as: "session" } }
    ]
}
