import { DataTypes } from "sequelize";

export default {
    name: "Rarity",
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
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$|^rainbow$/
            }
        },
        packOpeningAnimation: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["uncommon", "rare", "epic", "legendary", "chroma"]]
            }
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        extraWaitingTime: {
            type: DataTypes.INTEGER,
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
        tableName: "rarities"
    }
}