import { DataTypes } from "sequelize";

export default {
    name: "Blacklist",
    attributes: {
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    options: {
        tableName: "blacklists"
    }
}