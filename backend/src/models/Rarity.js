import { DataTypes } from "sequelize";

export default {
    name: "Rarity",
    attributes: {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => (Math.floor(Date.now() / 1000)).toString() + Math.floor(1000000 + Math.random() * 9000000).toString()
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
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
        }
    },
    options: {
        indexes: [{ unique: true, fields: ["name"] }],
        tableName: "rarities"
    }
}