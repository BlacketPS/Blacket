import { DataTypes } from "sequelize";

export default {
    name: "Resource",
    attributes: {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    options: {
        indexes: [{ unique: true, fields: ["path"] }],
        tableName: "resources"
    }
}