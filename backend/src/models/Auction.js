import { DataTypes } from "sequelize";

export default {
    name: "Auction",
    attributes: {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        item: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: "items",
                key: "id"
            }
        },
        blook: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: "blooks",
                key: "id"
            }
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        seller: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    options: {
        tableName: "auctions"
    }
}