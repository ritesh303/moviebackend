const theatreServices=require('../services/theatre.services')

const getAllTheatre= async(req,res)=>{
    try{
        const response=await theatreServices.getAllTheatre(req.query);
        if (response.error){
            return res.status(401).send({
                result:response.err
        })
        } else
            return res.status(200).send({
                result:response
            })
    }catch(err){
        return res.status(500).send({
            err:err.message
        })
    }
}

const createMovies= async(req,res)=>{
    try{
        const response=await theatreServices.createMovies(req.body,req.user);
        return res.status(200).send({
            result:response
        })
    }catch(err){
        return res.status(500).send({
            err:err.message
        })
    }
}

const getAllTheatrebyId=async(req,res)=>{
    try{
        const response=await theatreServices.getAllTheatrebyId(req.params.id);
        return res.status(200).send({
            result:response
        })
    }catch(err){
        return res.status(500).send({
            err:err.message
        })
    }
}

const deleteMovie=async(req,res)=>{
    try{
        const response=await theatreServices.deleteMovie(req.params.id);
        return res.status(200).send({
            result:response
        })
    }catch(err){
        return res.status(500).send({
            err:err.message
        })
    }
}

const updateTheatre=async(req,res)=>{
    try{
        const response=await theatreServices.updateTheatre(req.params.id,req.body);
        return res.status(200).send({
            result:response
        })
    }catch(err){
        return res.status(500).send({
            err:err.message
        })
    }
}

const updateTheatreToMovies = async(req,res)=>{
    console.log("==========controllers===============")
    try{
        const response=await theatreServices.updateTheatreToMovies(req.params.id,req.body);
        if (response.error){
            return res.status(401).send({
                result:response.error
            })
        }
        return res.status(200).send({
            result:response
        })
    }catch(err){
        console.log("controllers",err)
        return res.status(500).send({
            err:err.message
        })
    }
}

const checkMovieInTheatre= async(req,res)=>{
    console.log("==========controllers===============")
    try{
        const response=await theatreServices.checkMovieInTheatre(req.params.theatreId,req.params.movieId);
        if (response.error){
            return res.status(401).send({
                result:response.error
            })
        }
        return res.status(200).send({
            result:response
        })
    }catch(error){
        console.log("controllers",err)
        return res.status(500).send({
            error:err.message
        })
    }
}


module.exports={getAllTheatre,createMovies,getAllTheatrebyId,deleteMovie,updateTheatre,updateTheatreToMovies,checkMovieInTheatre}