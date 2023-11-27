const bookingService=require('../services/booking.services')


const createBooking= async(req,res)=>{
    try{
        const response=await bookingService.createBooking(req.body);
        // console.log(response)
        if(response.err){
            return res.status(401).send({
                result:response.err
            })
        }
        return res.status(200).send({
            return:response
        })
    }catch(err){
        return res.status(500).send({
            message:err.message
        })
    }
}

const getAllBookings=async(req,res)=>{
    try{
        const response=await bookingService.getAllBookings();
        // console.log(response)
        if(response.err){
            return res.status(401).send({
                result:response.err
            })
        }
        return res.status(200).send({
            return:response
        })
    }catch(err){
        return res.status(500).send({
            message:err.message
        })
    }
}
const getBookingsById=async(req,res)=>{
    try{
        const response=await bookingService.getBookingsById(req.params.id);
        // console.log(response)
        if(response.err){
            return res.status(401).send({
                result:response.err
            })
        }
        return res.status(200).send({
            return:response
        })
    }catch(err){
        return res.status(500).send({
            message:err.message
        })
    }
}
const getBookingsByTheatreId=async(req,res)=>{
    try{
        const response=await bookingService.getBookingsByTheatreId(req.params.id);
        // console.log(response)
        if(response.err){
            return res.status(401).send({
                result:response.err
            })
        }
        return res.status(200).send({
            return:response
        })
    }catch(err){
        return res.status(500).send({
            message:err.message
        })
    }
}

const getBookingsByTheatreIdandMovieId=async(req,res)=>{
    try{
        const response=await bookingService.getBookingsByTheatreIdandMovieId(req.params.id,req.params.movieId);
        if(response.err){
            return res.status(401).send({
                result:response.err
            })
        }
        return res.status(200).send({
            return:response
        })
    }catch(err){
        return res.status(500).send({
            message:err.message
        })
    }
}

const updateBooking=async(req,res)=>{
    try{
        const response=await bookingService.updateBooking(req.params.id,req.body);
        if(response.err){
            return res.status(401).send({
                result:response.err
            })
        }
        return res.status(200).send({
            return:response
        })
    }catch(err){
        return res.status(500).send({
            message:err.message
        })
    }
}

module.exports={createBooking,getAllBookings,getBookingsById,getBookingsByTheatreId,getBookingsByTheatreIdandMovieId,updateBooking}