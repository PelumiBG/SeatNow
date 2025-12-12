import { Register } from "../models/registration.js";
import { generateToken } from "../utils/generateToken.js";
import { Event } from "../models/event.js";

export const registerAttendee = async (req, res) => {
    try {
        const { userId, eventId, email, name, gender, age} = req.body;

        // Check if attendee already booked this event
        const existAttendee = await Register.findOne({
            where: { userId, eventId }
        });

        if (existAttendee) {
            return res.status(400).json({
                status: false,
                message: "You already booked a seat for this event"
            });
        };

        // Create booking
        const booking = await Register.create({
            userId,
            eventId,
            email,
            gender,
            age,
            name
        });

        // Token 
        const token = generateToken({ id: booking.id });

        // Send email
        await sendEventBookingMail(booking.email, booking.name);

        res.status(201).json({
            status: true,
            message: "Congratulations, You just booked a seat!",
            data: booking,
            token
        });

    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message || "Server Error"
        });
    }
};

export const getOneBooking = async (req, res) => {
    try{
        const { userId } = req.params;

        const book = await Register.findOne({ where: { userId }});

        if(!book){
            return res.status(404).json({status: false, message:"You're yet to register for any Event"})
        };

        return res.status(200)
        .json({ status: true, message:"List of Event Registered to by User", book})

    }catch(err){
        return res.status(503).json({status: false, message: err.message})
    }
}

export const cancelBooking = async (req, res) => {
    try{
        const { eventId, userId } = req.params;

        const event = await Register.findOne({ where: { eventId, userId }});

        if(!event){
            return res.status(401).json({ status: false, message: "Event Is not found"})
        };

        if(event.status === 'cancelled'){
            return res.status(400).json({ status: false, message:"Event cancelled for user"})
        };

        await event.update({status:"cancelled"});
        await event.save();

        return res.status(200).json({ status: true, message: "Event Cancelled Successfully", event})

    }catch(err){
        return res.status(503)
        .json({ status: false, message: err.message})
    }
}