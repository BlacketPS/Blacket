import { DataTypes } from "sequelize";

export default {
    name: "User",
    attributes: {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    },
    options: {
        tableName: "users"
    }
}