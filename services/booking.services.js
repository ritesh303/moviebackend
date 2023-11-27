const BookingModel=require('../models/booking.model')
const User=require('../models/user.modal')
const Movie=require('../models/movie.model')
const Theatre=require('../models/theatre.model')

const createBooking= async (data)=>{
    const bookingObj={
        theatreId:data.theatreId, 
        movieId:data.movieId,
        userId:data.userId,
        startTime:data.startTime,
        endTime:data.endTime,
        noOfSeats:data.noOfSeats,
        totalCosts:data.totalCosts
        }
    const booking=await BookingModel.create(bookingObj)
    console.log(booking)
        //for user
    const userInfo=await User.findOne({_id:booking.userId})
    userInfo.bookings.push(booking._id)
    await User.findOneAndUpdate({_id:userInfo._id},userInfo)

    //for movie
    const movieInfo=await Movie.findOne({_id:booking.movieId})
    movieInfo.bookings.push(booking._id)
    await Movie.findOneAndUpdate({_id:movieInfo._id},movieInfo)


    //for theatre
    const theatreInfo=await Theatre.findOne({_id:booking.theatreId})
    console.log(theatreInfo)
    theatreInfo.bookings.push(booking._id)
    await Theatre.findOneAndUpdate({_id:theatreInfo._id},theatreInfo)

    return booking
}
const getAllBookings=async()=>{
    const response=await BookingModel.find()
    return response
}

const getBookingsById=async(bookingId)=>{
    const response=await BookingModel.find({_id:bookingId})
    return response
}

const getBookingsByTheatreId=async(theatreId)=>{
    const theatreInfo=await Theatre.findOne({_id:theatreId})
    console.log("===============",theatreInfo)
    return theatreInfo.bookings
}

const getBookingsByTheatreIdandMovieId= async(theatreId,movieId)=>{
    const theatreResponse=await Theatre.findOne({_id:theatreId})
    const movieResponse=await Movie.findOne({_id:movieId})
    const result=[]
    for(const booking of theatreResponse.bookings){
        if(movieResponse.bookings.includes(booking)){
            result.push(booking)
        }
    }
    return result
}

const updateBooking=async(bookingId,data)=>{
    const booking=await BookingModel.findOne({_id:bookingId})
    if(!booking){
        throw new Error("invalid booking")
    }
    booking.theatreId=data.theatreId||booking.theatreId, 
    booking.movieId=data.movieId||booking.movieId,
    booking.startTime=data.startTime||booking.startTime,
    booking.endTime=data.endTime||booking.endTime,
    booking.noOfSeats=data.noOfSeats||booking.noOfSeats,
    booking.totalCosts=data.totalCosts||booking.totalCosts,
    booking.status=data.status||booking.status

    const updateBooking=await BookingModel.findOneAndUpdate({_id:bookingId},booking,{new:true})
    return updateBooking

}
module.exports={createBooking,getAllBookings,getBookingsById,getBookingsByTheatreId,getBookingsByTheatreIdandMovieId,updateBooking}