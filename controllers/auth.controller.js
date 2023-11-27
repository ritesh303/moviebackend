const authService=require('../services/auth.services')

const signup= async (req,res)=>{
    console.log("=====signUp========")
    try{
        const response=await authService.signup(req.body)
        console.log("=========================",response)
        if(response.error){
            return res.status(401).send({
                result:response.error,
            })
        }
        return res.status(201).send({
            result:response
        })
    }catch(err){
        return res.status(500).send({
            error:response.error
        })
    }

}
    
const signin= async (req,res)=>{
    try{
        const response=await authService.signin(req.body)
        // console.log("=========================",response)
        if(response.error){
            return res.status(401).send({
                result:response.error
            })
        }
        return res.status(201).send({
            result:response
        })
    }catch(err){
        return res.status(500).send({
            error:response.error
        })
    }

}

module.exports={signup,signin}