import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { generateToken } from '../utils/generateToken.js';

const appAdmin = async () => {
    try {
        const existAdmin = await User.findOne({
            where: { email: 'seatnowapp@gmail.com' }
        });

        if (existAdmin) {
            return existAdmin;
        };

        const secPassword = await bcrypt.hash('Pelumi124', 10);

        const admin = await User.create({
            name: 'SeatNow Admin',
            email: 'seatnowapp@gmail.com',
            phone: '+234705637828',
            password: secPassword,
            role: 'admin'
        });

        return console.log({
            status: true,
            message: "Admin Created Successfully",
            admin,
            token: generateToken(admin)
        });

    } catch (err) {
        console.error("Error Creating Admin", err);
        console.log({
        status: false,
        message: err.message});
    }
};

export default appAdmin;