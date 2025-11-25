import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';
import { sendWelcomeEmail } from '../utils/sendmail.js';

export const registerUser = async (req, res) => {
    try{
        const { name, email, phone, password } = req.body;

        const existUser = await User.findOne({where: {email}})
        if(existUser) return res.status(409).json({status:false,
            message:'Account Registered Aleady'
        });

        const newUser = await User.create({
            name,
            email,
            phone,
            password
        });

        const token = generateToken(newUser);

        await sendWelcomeEmail(newUser.email, newUser.name);

        res.status(201).json({
            status:'Account Registered Successfully',
            user:{
                name:newUser.name,
                email:newUser.email,
                phone:newUser.phone
            },
            token
        })
    }catch(err){
        return res.status(500).json({status: false, message:err.message || 'Server Error'})
    }
}

export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({where: {email}});
        if(!user) return res.status(401).json({message:'Not Allowed here'});

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json({status:false, message:'Password mismatch'});

        const token = generateToken(user);

        res.status(200).json({status:true, message:'Logged in successfully',
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone
            },
            token
        });

    }catch(err){
        res.status(503).json({status:false, message:err.message});
    }
};