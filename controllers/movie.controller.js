const movieservice=require('../services/movie.services')

const getAllMovies=async(req,res)=>{
    try{
        const response=await movieservice.getAllMovies()
        return res.status(200).send({
            result:response

        })
        }catch(err){
        return res.status(500).send({
            err:err.message
        })
    }
}

const createmovies= async(req,res)=>{
    try{
        const response=await movieservice.createAllMovies(req.body)
        return res.status(200).send({
            result:response

        })
        }catch(err){
        return res.status(500).send({
            err:err.message
        })
    }
}

const getAllMoviesbyId= async(req,res)=>{
    try{
        const response=await movieservice.getAllMoviesbyId(req.params.id)
        return res.status(200).send({
            result:response

        })
        }catch(err){
        return res.status(500).send({
            err:err.message
        })
    } 
}

const getAllMoviesbyName=async(req,res)=>{
    try{
        const response=await movieservice.getAllMoviesbyName(req.params.name)
        return res.status(200).send({
            result:response

        })
        }catch(err){
        return res.status(500).send({
            err:err.message
        })
    } 
}

const updatemovie= async(req,res)=>{
    try{
        const response=await movieservice.updatemovie(req.params.id,req.body)
        return res.status(200).send({
            result:response

        })
        }catch(err){
        return res.status(500).send({
            err:err.message
        })
    } 
}

const deletemovie = async(req,res)=>{
    try{
        const response=await movieservice.deletemovie(req.params.id)
        return res.status(200).send({
            result:response

        })
        }catch(err){
        return res.status(500).send({
            err:err.message
        })
    } 
}
const getTheatreonMovie= async(req,res)=>{
    try{
        const response=await movieservice.getTheatreonMovie(req.params.id)
        return res.status(200).send({
            result:response

        })
        }catch(err){
        return res.status(500).send({
            err:err.message
        })
    } 
}

module.exports={getAllMovies,createmovies,getAllMoviesbyId,getAllMoviesbyName,updatemovie,deletemovie,getTheatreonMovie}