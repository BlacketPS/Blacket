import { DataTypes } from "sequelize";

export default {
    name: "UserBlook",
    attributes: {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        blook: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "blooks",
                key: "id"
            }
        },
        sold: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        ownedBy: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        obtainedBy: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "unknown"
        }
    },
    options: {
        tableName: "user_blooks"
    },
    relations: [
        { type: "belongsTo", model: "User", options: { foreignKey: "user", as: "userData" } },
        { type: "belongsTo", model: "Blook", options: { foreignKey: "blook", as: "blookData" } },
        { type: "belongsTo", model: "User", options: { foreignKey: "ownedBy", as: "ownedByData" } }
    ]
}