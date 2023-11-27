const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    theatreId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"Theatre"
    },
    movieId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"Movie"
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,  
        ref:"User"
    },
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"In-progress"
    },
    noOfSeats:{
        type:Number,
        required:true
    },
    totalCosts:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now(),
        immutable:true
    },
    updatedAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
})
module.exports=mongoose.model("Booking",bookingSchema)