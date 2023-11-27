const moviecontrollers=require('../controllers/movie.controller')
const {validateMovieBody}=require('../middlewares/movies/requestValidator')

module.exports=function(app){
    //to get all the movies
    app.get('/mba/api/v1/mymovie',moviecontrollers.getAllMovies)


    //to create all the movies
    app.post('/mba/api/v1/mymovie',[validateMovieBody],moviecontrollers.createmovies)

    // to get movies based on id
    app.get('/mba/api/v1/mymovie/:id',moviecontrollers.getAllMoviesbyId)


    //to get movies basd on name
    app.get('/mba/api/v1/mymoviebyname/:name',moviecontrollers.getAllMoviesbyName)

    //to update a movie
    app.put('/mba/api/v1/mymovie/:id',moviecontrollers.updatemovie)

    //to delete a movie
    app.delete('/mba/api/v1/mymovie/:id',moviecontrollers.deletemovie)

    //to get list of theatres on a movie by using movieId
    app.get('/mba/api/v1/movies/:id/theatres',moviecontrollers.getTheatreonMovie)
}