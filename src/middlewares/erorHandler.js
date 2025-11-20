export const errorHandler = (err, req, res, next) => {
    try{
        if(err){
            return res.status(400).json({status: false, message: err.stack || 'Bad Request'})
        }
        next();
    }catch(error){
        res.status(503).json({message: 'Internal Server Error' || error.message})
    }
};