import {Event}from "../models/event.js";

export const createEvent = async (req, res) => {
    try{
        const { title, description, location, date, capacity } = req.body;

        const existEvent = await Event.findOne({where: date });
        if(existEvent) return res.status(403).json({status:false, message:'There is an event booked for thhis day'});

        const event = await Event.create({
            title,
            description,
            location,
            capacity,
            date
        });

        res.status(201).json({status: true, message:'Event Booked Successfully',event})
    }catch(err){
        res.status(503).json({status: false, message:err.message})
    }
};