//
import { paginate } from "../utils/paginate.js";
import { Event } from "../models/event.js";

export const listAllEvent = async (req, res) => {
  try {
    const result = await paginate(Event, {} ,
      {
        page: req.query.page,
        limit: req.query.limit,
        search: req.query.search,
        sort: [["createdAt", "DESC"]],
      }
    );

    res.status(200).json({
      status: true,
      message: "List of Event on SeatNow",
      ...result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
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