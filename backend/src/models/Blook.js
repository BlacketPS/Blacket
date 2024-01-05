import { DataTypes } from "sequelize";

export default {
    name: "Blook",
    attributes: {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rarity: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "rarities",
                key: "id"
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        background: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    options: {
        indexes: [{ unique: true, fields: ["name"] }],
        tableName: "blooks"
    }
}