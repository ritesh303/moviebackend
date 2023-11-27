const BookingModel=require('../../models/booking.model')
const{userTypes}=require('../../utils/constant')


const validateBookingreqbody=async(req,res,next)=>{

    try{
        if(!req.body.theatreId){
            throw new Error("value for field theatreId is missing")
        }
        if(!req.body.movieId){
            throw new Error("value for field movieId is missing")
        }
        if(!req.body.userId){
            throw new Error("value for field userId is missing")
        }
        if(!req.body.startTime){
            throw new Error("value for field startTime is missing")
        }
        if(!req.body.endTime){
            throw new Error("value for field endTime is missing")
        }
        if(!req.body.status){
            throw new Error("value for field status is missing")
        }
        if(!req.body.noOfSeats){
            throw new Error("value for field noOfSeats is missing")
        }
        if(!req.body.totalCosts){
            throw new Error("value for field totalCosts is missing")
        }
        if(req.body.noOfSeats<0 || req.body.noOfSeats==null){
            throw new Error('noOfSeats is invalid')
        }
        if(req.body.totalCosts<0 ||req.body.totalCosts==null){
            throw new Error('totalCosts is invalid')
        }
        next()
    }catch(err){
        return res.status(401).send({
            message:err.message
        })
    }
}
const isValidBooking=async(req,res,next)=>{
  
    try{
        const bookingId=req.params.id;
        const booking=await BookingModel.findOne({_id:bookingId})
        if(!booking){
            throw new Error(`invalid booking id : ${bookingId}`)
        }
        next()
    }catch(err){
        return res.status(401).send({
            message:err.message
        })
    }
}
const isAdminOrBookingOwner=async(req,res,next)=>{
  
    try{
        const current=req.user;
        if(req.user.userType == userTypes.admin){
            next()
        }
        else{
            
            const bookingId=req.params.id;
            const booking=await BookingModel.findOne({_id:bookingId})
            if(current._id.toString() !== booking.userId){
                throw new Error("only admin and booking owner can access it")
            }
            next()
        }

    }catch(err){
        res.status(401).send({
            message:err.message
        })
    }
}

module.exports={validateBookingreqbody,isValidBooking,isAdminOrBookingOwner}