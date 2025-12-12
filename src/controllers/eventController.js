import {Event}from "../models/event.js";
import { Register } from "../models/registration.js";
import { paginate } from "../utils/paginate.js";

export const createEvent = async (req, res) => {
    try{
        if(req.user.role !== "admin"){
            return res.status(401).json({ status: false, message:"Not Authorized for this Page"})
        };

        const { title, description, location, date, capacity } = req.body;

        const existEvent = await Event.findOne({where: { date } });
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

 export const listAttendees = async (req, res) => {
     try {
        if(req.user.role !== "admin"){
            return res.status(401).json({ status: false, message:"Not Authorized for this Page"})
        };

        const paginates = await paginate(Register, {},
            {
                page: req.query.page,
                limit: req.query.limit,
                search: req.query.search,
                sort: [["createdAt", "DESC"]]
            }
        )

         const { eventId } = req.params;
 
         const attendees = await Register.findAll({
             where: { eventId, status:  "active" }
         });
 
         res.status(200).json({
             status: true,
             message: "List of Attendees",
             ...paginates,
             data: attendees
         });
 
     } catch (err) {
         res.status(500).json({ status: false, message: err.message });
     }
 };

export const updateEvent = async(req, res) => {
    try{
        if(req.user.role !== "admin"){
            return res.status(401).json({ status: false, message:"Not Authorized for this Page"})
        };

        const { eventId } = req.params;

        const existEvent = await Event.findOne({ where: { eventId } });

        // Check if event exist
        if(!existEvent){
            return res.status(404)
            .json({status: false,
                message:"Event Not Found"
            });
        };

        // update event
        await existEvent.update(req.body)

        return res.status(200)
        .json({ status: true,
            message:"Event Updated Successfully",
            existEvent
        })
    }catch(err){
        return res.status(503).json({status:false, message: err.message})
    }
}