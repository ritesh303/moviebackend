const { userTypes,userStatus } = require("../../utils/constant")
const {isvalidEmail,isValidUserType,isValidUserStatus}=require('../../utils/validationUtils')

const verifySignupRequest=(req,res,next)=>{
    try{
       if(!req.body.name){
        throw new Error('value for field name is not provided')
       } 
       if(!req.body.email){
        throw new Error('value for field email is not provided')
       } 
       if(!req.body.username){
        throw new Error('value for field username is not provided')
       } 
       if(!req.body.password){
        throw new Error('value for field password is not provided')
       } 
       const ValidEmail=isvalidEmail(req.body.email);
       if(!ValidEmail){
        throw new Error("value for field 'email' is not valid");
        }
        req.body.userType && isValidUserType(req.body.userType)
        req.body.userStatus && isValidUserStatus(req.body.userStatus)
       next()

    }catch(error){
        return res.status(401).send({
            message:error.message
        })
    }    

    
}
const verifySigninRequest=(req,res,next)=>{
    try{
        if(!req.body.email){
            throw new Error('value for field email is not provided')
        } 
        if(!req.body.password){
            throw new Error('value for field password is not provided')
        } 
        const validEmail = isvalidEmail(req.body.email);
        if(!validEmail){
            throw new Error("value for field 'email' is not valid");
        }
        next()
    }catch(error){
        return res.status(500).send({
            message:error.message
        })
    }
}

module.exports={verifySignupRequest,verifySigninRequest}