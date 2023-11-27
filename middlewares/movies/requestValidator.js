const Movie=require('../../models/movie.model')




const validateMovieBody=async(req,res,next)=>{
    try{
        if(!req.body.name){
            throw new Error("value for field 'name' is missing")
        }
        if(!req.body.description){
            throw new Error("value for field 'description' is missing")
        }    
        if(!req.body.casts){
            throw new Error("value for field 'casts' is missing")  
        }
        if(!req.body.rating){
            throw new Error("value for field 'rating' is missing")  
        }
        if(!req.body.genre){
            throw new Error("value for field 'genre' is missing")  
        } 
        if(!req.body.posterUrl){
            throw new Error("value for field 'posterUrl' is missing")  
        }
        if(!req.body.trailerUrl){
            throw new Error("value for field 'trailerUrl' is missing")  
        } 
        if(!req.body.language){
            throw new Error("value for field 'language' is missing")  
        }  
        if(!req.body.releaseDate){
            throw new Error("value for field 'releaseDate' is missing")  
        } 
        if(!req.body.releaseStatus){
            throw new Error("value for field 'releaseStatus' is missing")  
        } 
        if(!req.body.director){
            throw new Error("value for field 'director' is missing")  
        }  
        
        const bymovie=await Movie.findOne({
            name:req.body.name,
            language:req.body.language,
            releaseDate:req.body.releaseDate
        })
        if(bymovie){
            throw new Error(`Movie with name: ${bymovie.name}, language: ${bymovie.language}, releaseDate: ${bymovie.releaseDate} already exists`)
        }

        next();
    }catch(err){
        return res.status(400).send({
            message:err.message
        })
    }
}

module.exports={validateMovieBody}