const {isvalidEmail,isValidUserType,isValidUserStatus}=require('../../../utils/validationUtils')

const verifyUpdatePasswordRequest=(req,res,next)=>{
    try{
        if(!req.body.oldpassword){
            throw new Error("value for field 'oldPassword' is not provided")
        }
        if(!req.body.newpassword){
            throw new Error("value for field 'newpassword' is not provided")
        }
        if(req.body.oldpassword==req.body.newpassword){
            throw new Error("value for fields 'oldPassword' and 'newPassword' cannot be equal")
        }
        next()
    }catch(err){
        return {
            err:err.message
        }
    }
}
const verifyUpdateUserInformationRequest=(req,res,next)=>{
    try{
        if(req.body.email){
            const validEmail=isvalidEmail(req.body.email);
            if(!validEmail){
                throw new Error("value for field 'email' is not valid");
            }
        }
        req.body.userType && isValidUserType(req.body.userType);
        req.body.userStatus && isValidUserStatus(req.body.userStatus);
        next()
    }catch(err){
        return {
            err:err.message
        }
    }
}

module.exports={verifyUpdatePasswordRequest,verifyUpdateUserInformationRequest}