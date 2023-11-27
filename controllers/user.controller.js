const userService=require('../services/user.services')

const updateuser=async(req,res)=>{
    try{
        const response=await userService.updateuser(req.user,req.params.id,req.body)
        if(response.error){
            return res.status(401).send({
                result:response.error
            })
        }
        return res.status(200).send({
            return:response
        })
    }catch(err){
        return res.status(500).send({
            err:err.message
        })
    }
}

const getAllUser=async(req,res)=>{
    try{
        const response=await userService.getAllUser()
        if(response.error){
            return res.status(401).send({
                result:response.error
            })
        }
        return res.status(200).send({
            return:response
        })
    }catch(err){
        return res.status(500).send({
            err:err.message
        })
    }
}
const updateuserpassword=async(req,res)=>{
    try{
        const response=await userService.updatePassword(req.user,req.params.id,req.body)
        if(response.error){
            return res.status(401).send({
                result:response.error
            })
        }
        return res.status(200).send({
            return:response
        })
    }catch(err){
        return res.status(500).send({
            err:err.message
        })
    }
}

module.exports={updateuser,getAllUser,updateuserpassword}