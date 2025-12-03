import User from "./user";
import { Register } from "./registration";
import { Event } from "./event";

User.hasMany(Register, { foreignKey:"userId"});
Register.belongsTo(User, { foreignKey:"userId"});

Event.hasMany(Register, { foreignKey:"userId"});
Register.belongsTo(Event, { foreignKey:"userId"});

User.belongsToMany(Event, { through: Register});
Event.belongsToMany(User, { through: Register});

export { User, Event, Register };