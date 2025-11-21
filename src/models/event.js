import mongoose, { Model } from 'mongoose';

const eventSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String, required:true},
    date: Date,
    location:{type:String, required:true},
    capacity:{type:Number,min:1,max:1000}
}, {timestamps: true}
);

const Event = mongoose.model('Event', eventSchema);
export default Event;