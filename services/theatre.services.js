const theatre=require('../models/theatre.model')
const movie=require('../models/movie.model')
const User=require('../models/user.modal')

const getAllTheatre=async(filter)=>{
    const response=await theatre.find(filter);
    return response
}

const createMovies=async(data,user)=>{
    console.log("============user=============",user)
    const theatreObj={
        Name:data.Name,
        description:data.description,
        rating:data.rating,
        street:data.street,
        city:data.city,
        state:data.state,
        pincode:data.pincode,
        createdBy: user._id
    }
    const response=await theatre.create(theatreObj);
    console.log("&&&&&&&&&&&&&&&&&&&&&",response)
    return response
   
}


const getAllTheatrebyId=async (theatreId)=>{
    const response=await theatre.findOne({_id:theatreId});
    return response
}
const deleteMovie=async (theatreId)=>{
    const response=await theatre.findByIdAndDelete({_id:theatreId});
    return response
}
const updateTheatre=async (theatreId,updates)=>{
    const response=await theatre.findOne({_id:theatreId});

    // console.log("===newUpdate===",updates)
    response.Name=updates.Name||response.Name,
    response.description=updates.description||response.description,
    response.rating=updates.rating ||response.rating ,
    response.street=updates.street ||response.street ,
    response.city=updates.city || response.city,
    response.state=updates.state || response.state,
    response.pincode=updates.pincode || response.pincode
    // console.log("====newResponse====",response)
    const updatedTheatre=await theatre.findOneAndUpdate({_id:theatreId},response,{new:true})
    return updatedTheatre;
}
const addmoviesToTheatre=async(theatreId,moviesIds)=>{
    try{
        const Theatre=await theatre.findOne({_id:theatreId})
        // console.log("====Theatre=====",Theatre)
    
        if(Theatre){
            if (!moviesIds && moviesIds.length==0){
                return Theatre
            }
            // const moviesIds=data.movies;
            // console.log("====moviesIds=====",moviesIds)
            let count=0;
            for(const movieId of moviesIds){
                count ++
                if (!Theatre.movies.includes(movieId))
                {
                    const Movie= await movie.findOne({_id:movieId})
                    if (!Movie){
                        throw new Error("Invalid movie id")
                    }
                    // console.log("====movie=====",Movie)
                    Movie && Theatre.movies.push(Movie._id)
                    //maintaining relationship
                    Movie.theatres.push(Theatre._id)
                    console.log("=====newMoviesid======")
                    await movie.findOneAndUpdate({_id:Movie._id},Movie)
                }
                if (count ==moviesIds.length){
                    const updateTheatre=await theatre.findOneAndUpdate({_id:theatreId},Theatre,{new:true})
                    return updateTheatre
                }
            };
    
        }
    }catch(err){
        return {
            error:err.message
        }
    }
 


}

const removeMovieFromTheatre= async(theatreId,moviesIds)=>{
    try{
        const Theatre = await theatre.findOne({_id:theatreId})
        if(Theatre) {
            if(!moviesIds || moviesIds.length == 0 ){
                return Theatre
            }
            let count=0
            for (const movieId of moviesIds){
                count ++
                const Movie=await movie.findOne({_id:movieId})
                if (!Movie){
                    throw new Error("Invalid movie Id");
                }
        
                const index=Theatre.movies.indexOf(movieId)
                if(index>-1){
                    Theatre.movies.splice(index,1)
                    const theatreIndex=Movie.theatres.indexOf(Theatre._id)
                    if(theatreIndex>-1){
                        Movie.theatres.splice(theatreIndex,1)
                        await movie.findOneAndUpdate({_id:Movie._id},Movie)
                    }
                }
            }
            if(count == moviesIds.length){
                const updatedTheatre=await theatre.findOneAndUpdate({_id:theatreId},Theatre,{new:true});
                return updatedTheatre
            }

    
        }
    }catch(err){
        return{
           error:err.message 
        }
    }

}

const updateTheatreToMovies=async(theatreId,data)=>{
    try{
        const Theatre=await theatre.findOne({_id:theatreId})
        if(Theatre){
            const addMovie=await addmoviesToTheatre(theatreId,data.addMovieIds);
            const response=await removeMovieFromTheatre(theatreId,data.removeMovieIds)
            return response
        }
        else{
            throw new Error("Invalid theatre Id")
        }
    }catch(err){
        return {
            error:err.message
        }
    }
}

const checkMovieInTheatre=async(theatreId,movieId)=>{
    try{
        const Theatre=await theatre.findOne({_id:theatreId});
        if(Theatre){
            const Movie=await movie.findOne({_id:movieId})
            if(!Movie){
                throw new Error ("Invalid movie id")
            }
            const successMessage="movie is present in this theatre"
            const failureMessage="movie is not present in this theatre"
            return{
                message:Theatre.movies.includes(movieId)?successMessage:failureMessage
            }
        }
        else{
            throw new Error("Invalid Theatre")
        }
    }catch(err){
        return{
            error:err.message
        }
    }
}


module.exports={getAllTheatre,createMovies,getAllTheatrebyId,deleteMovie,updateTheatre,addmoviesToTheatre,removeMovieFromTheatre,updateTheatreToMovies,checkMovieInTheatre}