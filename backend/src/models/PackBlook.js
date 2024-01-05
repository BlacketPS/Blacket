import {DataTypes} from "sequelize";

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
        tableName: "pack_blooks"
    }
}