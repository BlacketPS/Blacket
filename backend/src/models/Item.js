import { DataTypes } from "sequelize";

export default {
    name: "Item",
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
        rarity: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: "rarities",
                key: "id"
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["none", "booster", "paintBucket"]]
            }
        },
        canUse: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        canList: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        canTrade: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        boosterDuration: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        paintBucketColor: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^#([0-9a-f]{3}){1,2}$/i
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    options: {
        indexes: [{ unique: true, fields: ["name"] }],
        tableName: "items"
    }
}