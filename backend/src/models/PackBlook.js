import { DataTypes } from "sequelize";

export default {
    name: "PackBlook",
    attributes: {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        pack: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "packs",
                key: "id"
            }
        },
        blook: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "blooks",
                key: "id"
            }
        }
    },
    options: {
        tableName: "pack_blooks"
    },
    relations: [
        { type: "belongsTo", model: "Pack", options: { foreignKey: "pack", as: "packData" } },
        { type: "belongsTo", model: "Blook", options: { foreignKey: "blook", as: "blookData" } }
    ]
}