import { DataTypes } from "sequelize";

export default {
    name: "Blook",
    attributes: {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        chance: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
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
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        background: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        priority: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
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
    },
    relations: [
        { type: "belongsTo", model: "Rarity", options: { foreignKey: "rarity", as: "rarityData" } }
    ]
}