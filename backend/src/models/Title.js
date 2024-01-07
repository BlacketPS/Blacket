import { DataTypes } from "sequelize";

export default {
    name: "Title",
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
        tableName: "titles"
    },
    relations: [
        {
            type: "belongsTo",
            model: "Rarity",
            options: {
                foreignKey: "rarity",
                as: "rarityData"
            }
        }
    ]
}