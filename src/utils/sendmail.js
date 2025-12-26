import { transporter } from "../services/emailService.js";
import { fileURLToPath } from "url";
import path from 'path';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendEventBookingMail = async (email, name) => {
    try{

        const templatePath = path.join(__dirname, '../view/email/bookingEmail.ejs');

        const html = await ejs.renderFile(templatePath, {name})
        await transporter.sendMail({
            from:`SeatNow <${process.env.EMAIL_FROM || 'seatnowapp@gmail.com'}>`,
            to: email,
            subject:`Your Event has been booked`,
            html,
        })
    }catch(err){
        throw new Error('Email Notification Failed')
    }
};

export const sendWelcomeEmail = async (email, name) => {
    try{
        const templatePath = path.join(__dirname, '../view/email/welcomeEmail.ejs');
        
        const html = await ejs.renderFile(templatePath, {name});

        await transporter.sendMail({
            from:`SeatNow <${process.env.EMAIL_USER}>`,
            to:email,
            subject:`WELCOME TO SEATNOW `,
            html,
        });
    }catch(err){
        console.error(err);
        throw new Error('Email Notification Failed')
    };
};