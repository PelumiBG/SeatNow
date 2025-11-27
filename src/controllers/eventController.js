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

export const listAllEvent = async (req, res) => {
    try{
        const event = await Event.findAll({order: ['createdAt']});

        res.status(200).json({status:true,
            message:'List of all event',
            count: event.length,
            data:event
        })
    }catch(err){
        res.status(500).json({status: true, message:err.message})
    }
};

export const deleteEvent = async (req, res) => {
    try{
        const { eventId } = req.params.eventId;

        const existEvent = await Event.findOne({where:{id: eventId}});

        if(!existEvent) return res.status(404).json({status: false, message:'Event Not Listed'});
        
        await existEvent.destroy();

        res.status(200).
        json({
            status: true,
            message:'Event Deleted Successfully'
        })
    }catch (err) {
        res.status(503).json({status:false,
            message:err.message
        })
    }
}