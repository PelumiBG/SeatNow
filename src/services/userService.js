import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';
import { sendWelcomeEmail } from '../utils/sendmail.js';

export const registerUser = async (req, res) => {
    try{
        const { name, email, phone, password } = req.body;

        const existUser = await User.findOne({ email });
        if(existUser) return res.status(409).json({status:false,
            message:'Account Registered Aleady'
        });

        const secPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            phone,
            password:secPassword
        });

        const token = generateToken(newUser);

        await sendWelcomeEmail(newUser.email, newUser.name);

        res.status(201).json({
            status:'Account Registered Successfully',
            user:{
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role
            },
            token
        })
    }catch(err){
        return res.status(500).json({status: false, message:err.message || 'Server Error'})
    }
}