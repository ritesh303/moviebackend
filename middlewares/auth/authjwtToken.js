const jwt=require('jsonwebtoken')
const User=require('../../models/user.modal')
const BookingModel=require('../../models/booking.model')
const {userTypes,userStatus}=require('../../utils/constant')
const {secretKey}=require('../../config/auth.config')
require('dotenv').config();

const verifyUserWithToken=async(req,res,next)=>{
    const token=req.headers['x-access-token'];
    if(!token){
        return res.status(401).send({
            message:"no auth token provided"
        })
    }
    jwt.verify(token,process.env.secretKey,async(err,decoded)=>{
        if(err){
            return res.status(403).send({
                result:"unauthorized",
                message:err.message
            })
        }
        const user=await User.findOne({_id:decoded.userId})
        if(!user){
            return res.status(401).send({
                message:"invalid user",
            })
        }
        req.user=user;
        next();
    })
}

const isUserStatusApproved=async(req,res,next)=>{
    if(req.user.userStatus!=userStatus.approved){
        return res.status(403).send({
            message:`current user with user status ${req.user.userStatus} is unauthorized`
        })
    }
    next()
}

const isAdminOrClient=(req,res,next)=>{
    try{
        if(req.user.userType !=userTypes.admin && req.user.userType !=userTypes.client){
            throw new Error(`admin or client role is required`)
        }
        next()
    }catch(err){
        return res.status(403).send({
            message:err.message
        })
    }
}


const isAdmin=async(req,res,next)=>{
    if(req.user.userType != userTypes.admin ){
        return res.status(403).send({
            message:"Admin role is required"
        })
    }
    next()
}
 
module.exports={verifyUserWithToken,isAdmin,isAdminOrClient,isUserStatusApproved}





// const verifyUser=async(req,res,next)=>{
//     const user=await User.findOne({_id:req.userId})
//     if(!user){
//         return res.status(401).send({
//             message:"invalid user"
//         })
//     }
//     req.user=user;
//     next()
// }