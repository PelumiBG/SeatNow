import { Register } from "../models/registration.js";
import { generateToken } from "../utils/generateToken.js";

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
        }

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


export const listAttendees = async (req, res) => {
    try {
        const { eventId } = req.params;

        const attendees = await Register.findAll({
            where: { eventId }
        });

        res.status(200).json({
            status: true,
            message: "List of Attendees",
            data: attendees
        });

    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};
