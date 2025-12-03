import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../configs/db.js";
import { Register } from "./registration.js";

export const Event = sequelize.define('Event',{
    eventId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate: {
            min:200, max:400
        }
    },
    date: {
        type:DataTypes.INTEGER,
        allowNull: false
    }
}, {timestamps: true});