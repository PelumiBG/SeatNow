import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name:{ type:String, required:true},
    email:{ type:String, required:true, unique:true },
    phone:{ type:Number, required:true},
    password:{ type:String, required:true, unique:true, min:7,max:10},
    role:{type:String, enum:['Admin','User'], default:'User'}
}, {timestamps: true }
);

userSchema.pre('save',async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}; 

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject
};

const User = mongoose.model('User', userSchema);
export default User;