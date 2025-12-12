import { Register } from "../models/registration.js";
import { paginate } from "../utils/paginate.js";
import { Event } from "../models/event.js";

export const listAllEvent = async (req, res) => {
  try {
        if(req.user.role !== "admin"){
          return res.status(401).json({ status: false, message:"Not Authorized for this Page"})
        };
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

export const deleteUser = async(req, res) => {
  try{
    if(req.user.role !== "admin"){
      return res.status(401).json({ status: false, message:"Not Allowed Here"})
    };

    const { eventId } = req.params;

    const user = await Register.findOne({ where: { eventId, status: "cancelled"}});

    if(!user){
      return res.status(404).json({ status: false, message:"No Inactive Registration Found"})
    };

    await user.destroy();

    return res.status(200)
    .json({ status: true, message: "Inactive Registration Deleted Successfully", user})

  }catch(err){
    return res.status(503).json({
      status:false,
      message:err.message
    })
  }
}

export const deleteEvent = async (req, res) => {
    try{
        if(req.user.role !== "admin"){
          return res.status(401).json({ status: false, message:"Not Authorized for this Page"})
        };

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