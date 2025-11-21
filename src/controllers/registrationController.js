import Register from "../models/registration";
import { generateToken } from "../utils/generateToken";
import { sendEventBookingMail } from "../utils/sendmail";

export const registerAttendee = async (req, res) => {
    try{
        const { userId, eventId } = req.params;
        const existAttendee = await Register.findById(userId);

        if(!existAttendee) return res.status(404).json({status: false, message:'Attendee Not Found, Kindly Register'});

        const event = await Register.create({ user: userId, event: eventId});

        const token = generateToken(event)

        await sendEventBookingMail(event.email, email.name)

        res.status(201).json({status: true,
            message:'Congratulations, You just book a Seat',
            data:{
                id:event._id,
                event
            },
            token
        })
    }catch(err){
        res.status(500).json({status:false, message:err.message || 'Server Error'})
    }
}