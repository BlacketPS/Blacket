import { DataTypes } from "sequelize";

export default {
    name: "Message",
    attributes: {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        room: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "rooms",
                key: "id"
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        mentions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: []
        },
        replyingTo: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "messages",
                key: "id"
            }
        },
        edited: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    options: {
        tableName: "messages"
    },
    relations: [
        { model: "User", type: "belongsTo", options: { foreignKey: "author" } },
        { model: "Room", type: "belongsTo", options: { foreignKey: "room" } },
        { model: "Message", type: "belongsTo", options: { foreignKey: "replyingTo", as: "reply" } }
    ]
}