import { DataTypes } from "sequelize";

export default {
    name: "Session",
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
        createdAt: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: +Date.now()
        }
    },
    options: {
        indexes: [{ unique: true, fields: ["user"] }],
        tableName: "sessions"
    }
}