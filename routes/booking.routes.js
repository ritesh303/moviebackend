const bookingController=require('../controllers/booking.controller')
const {verifyUserWithToken,isUserStatusApproved,isAdmin}=require('../middlewares/auth/authjwtToken')
const {validateBookingreqbody,isAdminOrBookingOwner,isValidBooking}=require('../middlewares/booking/reqValidator')
const {isAdminOrTheatreOwner}=require('../middlewares/theatres/requestValidator')



module.exports=function(app){
    // create a booking and only authenticated user can make the booking
    app.post('/mba/api/v1/book/',[ verifyUserWithToken,isUserStatusApproved,validateBookingreqbody],bookingController.createBooking)

    //only admin can get all the bookings
    app.get ('/mba/api/v1/book/',[verifyUserWithToken,isUserStatusApproved,isAdmin],bookingController.getAllBookings)

    //get booking by booking Id (admin/user)
    app.get ('/mba/api/v1/book/:id',[verifyUserWithToken,isUserStatusApproved,isValidBooking,isAdminOrBookingOwner],bookingController.getBookingsById)

    //get booking bt theatreId (admin/theatreowner)
    app.get('/mba/api/v1/bookbytheatre/:id',[verifyUserWithToken,isUserStatusApproved,isAdminOrTheatreOwner],bookingController.getBookingsByTheatreId)

    //get booking by theatreId and movieId
    app.get('/mba/api/v1/bookbytheatreandmovie/:id/:movieId',[verifyUserWithToken,isUserStatusApproved,isAdminOrTheatreOwner],bookingController.getBookingsByTheatreIdandMovieId)


    //to update a booking
    app.put('/mba/api/v1/updatebooking/:id',[ verifyUserWithToken,isUserStatusApproved,isValidBooking,isAdminOrBookingOwner],bookingController.updateBooking)
}