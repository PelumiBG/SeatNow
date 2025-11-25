import { transporter } from "../services/emailService.js";

export const sendEventBookingMail = async (email , name) => {
    try{
        await transporter.sendMail({
            from:`SeatNow <${process.env.EMAIL_FROM}>`,
            to:email,
            subject:`Your Event has been booked`,
            html:`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                </head>
                <body>
                    <div>
                        <h1>Welcome To SeatNow ${name}</h1>
                        <p>Your seat has been booked keep checking email for more info</p>
                        <p>Enjoy seamless service</p>
                    </div>
                    <footer>do not reply to this email</footer>
                </body>
                </html>`
        })
    }catch(err){
        throw new Error('Email Notification Failed')
    }
};

export const sendWelcomeEmail = async (email, name) => {
        try{
        await transporter.sendMail({
            from:`SeatNow <${process.env.EMAIL_USER}>`,
            to:email,
            subject:`WELCOME TO SEATNOW`,
            html:`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                </head>
                <body>
                    <div>
                        <h1>Hello ${name}!</h1>
                        <p>Your seat has been booked keep checking email for more info</p>
                        <p>Enjoy seamless service</p>
                    </div>
                    <footer>
                        <p>do not reply to this email</p>
                    </footer>
                </body>
                </html>`
        });
    }catch(err){
        console.error(err);
        throw new Error('Email Notification Failed')
    };
};