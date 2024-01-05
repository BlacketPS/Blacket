import { DataTypes } from "sequelize";

export default {
    name: "UserBlook",
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
    }
}