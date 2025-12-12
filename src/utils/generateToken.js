import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    try{
        if(!user){
            throw new Error('User Not Found')
        };

        const payload = jwt.sign(
            { userId: user.userId, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: '10d'}
        );

        return payload;

    }catch(err){
        console.error('Token Generation Error', err.message);
        throw new Error("Genearting Token Failed")
    }
}