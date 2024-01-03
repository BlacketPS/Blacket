import { DataTypes } from "sequelize";

export default {
    name: "Blook",
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
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        background: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    options: {
        indexes: [{ unique: true, fields: ["name"] }],
        tableName: "blooks"
    }
}