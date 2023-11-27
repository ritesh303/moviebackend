const movie=require('../models/movie.model')

const getAllMovies= async()=>{
    // let movies=[]
    // if(data.name){
    //     movies=await getAllMoviesbyName(data.name)
    // }
    // else{
    //    const movies=await movie.find()
    // }
    const movies=await movie.find()
    return movies;
}

const createAllMovies= async(data)=>{
    
    const movieObj={
        name: data.name,
        description: data.description,
        casts: data.casts,
        rating: data.rating,
        genre: data.genre,
        posterUrl: data.posterUrl,
        trailerUrl: data.trailerUrl,
        language: data.language,
        releaseDate: data.releaseDate,
        releaseStatus: data.releaseStatus,
        director: data.director,
    }
    const movies=await movie.create(movieObj);
    return movies;

}

const getAllMoviesbyId= async(movieid)=>{
    const response=await movie.findOne({_id:movieid});
    return response;
}

const getAllMoviesbyName= async(moviename)=>{
    const response=await movie.find({name:moviename});
    return response;
}

const updatemovie=async(movieId,updates)=>{
    const response=await movie.findOne({_id:movieId})
    response.name=updates.name||response.name
    response.description=updates.description || response.description;
    response.casts= updates.casts|| response.casts;
    response.rating= updates.rating || response.rating;
    response.genre= updates.genre || response.genre;
    response.posterUrl= updates.posterUrl || response.posterUrl;
    response.trailerUrl= updates.trailerUrl || response.trailerUrl;
    response.language= updates.language || response.language;
    response.releaseDate=updates.releaseDate || response.releaseDate;
    response.releaseStatus= updates.releaseStatus || response.releaseStatus;
    response.director= updates.director || response.director;
    const updatedmovie=await movie.findOneAndUpdate({_id:movieId},response,{new:true})
    return updatedmovie;
}
const deletemovie=async(movieId)=>{
    const response=await movie.findOneAndDelete({_id:movieId});
    return response;
}
const getTheatreonMovie=async(movieId)=>{
    const response=await movie.findOne({_id:movieId});
    return response.theatres;
}
module.exports={getAllMovies,createAllMovies,getAllMoviesbyId,getAllMoviesbyName,updatemovie,deletemovie,getTheatreonMovie}