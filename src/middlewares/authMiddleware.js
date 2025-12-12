import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Middleware to protect routes
export const protectUser = async(req, res, next) => {
    let token;
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
             token = req.headers.authorization.split(" ")[1];

             const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findOne({ where: {userId: decoded.userId}});

            if(!user){
                return res.status(401)
                .json({ status: false,
                    message:"User Account Not Found"
                })
            };

            req.user = user;
            return next();
        }
        return res.status(404).json({status: false, message: "Token Not Detected" || err.message})
    }catch(err){
        return res.status(503)
        .json({status: false, message: err.message})
    }
}