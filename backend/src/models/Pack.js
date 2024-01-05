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
                is: /^#([0-9a-f]{3}){1,2}$/i
            }
        },
        outerColor: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^#([0-9a-f]{3}){1,2}$/i
            }
        },
        image: {
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
        tableName: "packs"
    }
}