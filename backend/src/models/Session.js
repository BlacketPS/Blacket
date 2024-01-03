import { DataTypes } from "sequelize";

export default {
    name: "Session",
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
        secret: {
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        }
    },
    options: {
        indexes: [{ unique: true, fields: ["user"] }],
        tableName: "sessions"
    }
}