import jwt from 'jsonwebtoken';

const protectUser = (req, res) => {
    let token;
    try{
    }catch(err){
        res.status(503).json({status:false, message:err.message})
    }
}