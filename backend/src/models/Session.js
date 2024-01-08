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
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    options: {
        indexes: [{ unique: true, fields: ["user"] }],
        tableName: "sessions"
    },
    relations: [
        { type: "belongsTo", model: "User", options: { foreignKey: "user", as: "userData" } }
    ]
}