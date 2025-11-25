import { DataTypes } from "sequelize";
import sequelize from "../configs/db.js";

export const Register = sequelize.define('Register',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    eventId: { 
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {isEmail: true}
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type:DataTypes.INTEGER,
        allowNull: false,
        validate: {min:18, max:120}
    }
}, {timestamps: true});