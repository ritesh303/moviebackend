require('dotenv').config();
const User=require('../models/user.modal');
const {userTypes,userStatus}=require('../utils/constant')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const {secretkey}=require('../config/auth.config')


const signup=async(data)=>{

    try{
        let userStatusData=data.userStatus;
        if(!userStatusData){
            //in either of the case,user is going to be customer
            if(!data.userType || data.userType== userTypes.customer){
                userStatusData=userStatus.approved
            }
            else{
                userStatusData=userStatus.pending
            }
        }
        const userObj={
            name:data.name,
            email:data.email,
            username:data.username,
            password:data.password,
            userType:data.userType,
            userStatus:userStatusData
        }
        const response=await User.create(userObj);
        // console.log("response",response)
        // result.user=response
        return response
    }catch(err){
        result.error=err.message
        return result
    }

}

const signin=async(data)=>{
    let result;
    try{
        const user=await User.findOne({email:data.email})
        //to check is user exist
        if(!user){
            throw new Error("user does not exist")
        }
        //to check if a user is registered
        if(user.userStatus != userStatus.approved){
            throw new Error(`user is not allowed to login, as user is in status [${user.userStatus}]`)
        } 
        const isValidPassword=bcrypt.compareSync(data.password,user.password ); 
        //first one is provided by us and second one is stored in db
        if(!isValidPassword){ 
            throw new Error("invalid password")
        }
        //to get accesstoken
        const accesstoken=jwt.sign({ userId: user._id,email:user.email }, process.env.secretkey);
        const response={
            name:user.name,
            email:user.email,
            username:user.username,
            userType:user.userType,
            userStatus:user.userStatus,
            token:accesstoken
        }
        return response
    }catch(err){
        return{
            err:err.message
        }
    }

}

module.exports={signup,signin}