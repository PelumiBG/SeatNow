import mongoose from 'mongoose';

const registerSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    event:{type:mongoose.Schema.Types.ObjectId, ref:'event'},
    status:{type:String, default:'Registered'}
});

const Register = mongoose.model('Register', registerSchema);
export default Register;