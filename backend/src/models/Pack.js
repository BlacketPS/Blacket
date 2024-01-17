import { DataTypes } from "sequelize";

export default {
    name: "Pack",
    attributes: {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        innerColor: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$|^rainbow$/
            }
        },
        outerColor: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$|^rainbow$/
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
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
        tableName: "packs"
    },
    relations: [
        { type: "hasMany", model: "PackBlook", options: { foreignKey: "pack", as: "blooks" } }
    ]
}