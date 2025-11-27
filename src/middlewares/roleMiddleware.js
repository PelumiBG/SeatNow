export const roleMiddleware = (req, res) => {
    try{
        if(!req.user.role !== 'admin') {
            res.status(400).json({status:false,
                message:'Not Authorized'
            });
        }
    }catch(err){
        console.error("Error checking Role", err.message);
        process.exit(1)
    }
}