const Theatre=require('../../models/theatre.model')
const { userTypes } = require('../../utils/constant')

const validateReqBody=async(req,res,next)=>{

    try{
        if(!req.body.Name){
            throw new Error("value for field 'Name' is not provided")
        }
        if(!req.body.description){
            throw new Error("value for field 'description' is not provided")
        }
        if(!req.body.rating){
            throw new Error("value for field 'rating' is not provided")
        }
        if(!req.body.street){
            throw new Error("value for field 'street' is not provided")
        }
        if(!req.body.city){
            throw new Error("value for field 'city' is not provided")
        }
        if(!req.body.state){
            throw new Error("value for field 'state' is not provided")
        }
        if(!req.body.pincode){
            throw new Error("value for field 'pincode' is not provided")
        }

        const theatre=await Theatre.findOne({
            Name:req.body.Name,
            pincode:req.body.pincode
        })
        if(theatre){
            throw new Error("Failed!! Same theatre already exist at the same location!!")
        }
        next();
    }catch(err){
        return res.status(400).send({
            message:err.message
        })
    }
}

const isAdminOrTheatreOwner=async(req,res,next)=>{
    try{
        const currentUser=req.user;
        if(req.user.userType == userTypes.admin){
            next();
        }
        else{
            const theatreId=req.params.id
            const theatre=await Theatre.findOne ({
                _id:theatreId
            })
            // console.log("==============current user===========",currentUser)
            // console.log("===============theatreId=============",theatre)
            if(currentUser._id.toString() != theatre.createdBy){
                throw new Error("Only theatre owner can update or delete the theatre's info")
            }
            next()
        }
    }catch(err){
        return res.status(401).send({
            messasge:err.message
        })
    }

}


module.exports={validateReqBody,isAdminOrTheatreOwner}