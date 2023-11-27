const theatreControllers=require('../controllers/theatre.controller')
const {validateReqBody,isAdminOrTheatreOwner}=require('../middlewares/theatres/requestValidator')
const {verifyUserWithToken,isAdmin,isAdminOrClient,isUserStatusApproved}=require('../middlewares/auth/authjwtToken')

module.exports=function(app){
    //to get all the theatre
    app.get('/mba/api/v1/theatre',theatreControllers.getAllTheatre)

    //to create movies
    app.post('/mba/api/v1/theatre',[validateReqBody,verifyUserWithToken,isUserStatusApproved,isAdminOrClient],theatreControllers.createMovies)

    //to get all the movies based on id
    app.get('/mba/api/v1/theatre/:id',[verifyUserWithToken,isUserStatusApproved,isAdminOrTheatreOwner],theatreControllers.getAllTheatrebyId)

    //to delete a movie
    app.delete('/mba/api/v1/theatre/:id',[verifyUserWithToken,isUserStatusApproved,isAdminOrTheatreOwner],theatreControllers.deleteMovie)

    //to update all theatres
    app.put('/mba/api/v1/theatre/:id',[verifyUserWithToken,isUserStatusApproved,isAdminOrTheatreOwner],theatreControllers.updateTheatre)

    //to add/remove movies to a theatre
    app.put('/mba/api/v1/theatre/:id/movie',[verifyUserWithToken,isUserStatusApproved,isAdminOrTheatreOwner],theatreControllers.updateTheatreToMovies)

    //to check a movie in a theatre
    app.get('/mba/api/v1/theatre/:theatreId/movie/:movieId',[verifyUserWithToken,isUserStatusApproved,isAdminOrClient],theatreControllers.checkMovieInTheatre)
    




}