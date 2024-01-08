import { DataTypes } from "sequelize";

export default {
    name: "PackBlook",
    attributes: {
        pack: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
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
        indexes: [{ unique: true, fields: ["pack"] }],
        tableName: "pack_blooks"
    },
    relations: [
        { type: "belongsTo", model: "Pack", options: { foreignKey: "pack", as: "packData" } },
        { type: "belongsTo", model: "Blook", options: { foreignKey: "blook", as: "blookData" } }
    ]
}