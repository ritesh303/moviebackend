const User=require('../models/user.modal');
const {userTypes,userStatus}=require('../utils/constant')
const bcrypt=require('bcryptjs')

const updateuser=async(currentUser,userId,updates)=>{
    try{
        const user=await User.findOne({_id:userId});
        // console.log("===user===",user)
        if(!user){
            throw new Error("user doesn't exist")
        }
        /**
         * admin can update their own information
         * admin can update any other's user information
         * user with any role apart from admin can update their own information only
         * user with role apart from admin cannot update anybody else's information
         */


        if(currentUser.userType!=userTypes.admin && currentUser._id !=user._id){
            throw new Error(`current user with usertype: ${user.userType} is not allow to change the information of others`)
        }
        //if only usertype is getting updated then only admin can update it
        if(updates.userType && updates.userType !=user.userType && currentUser.userType !=userTypes.admin){
            throw new Error(`current user with usertype: ${user.userType} is not allow to change the userType`)
        }
        //if only userstatus is getting updated then only admin can update it
        if(updates.userStatus && updates.userStatus !=user.userStatus && currentUser.userType !=userTypes.admin){
            throw new Error(`current user with usertype: ${user.userType} is not allow to change the userStatus`)
        }

        user.name=updates.name||user.name
        user.email=updates.email||user.email
        user.username=updates.username||user.username
        user.userStatus=updates.userStatus||user.userStatus
        user.userType=updates.userType||user.userType

        const updatedusernew=await User.findByIdAndUpdate({_id:userId},user,{new:true})
        // console.log("=======updatedusernew===========",updatedusernew)
        return updatedusernew

    }catch(err){
        return{
            result:err.message
        }
    }
}


const getAllUser=async()=>{
    const response=await User.find()
    return response
}

const updatePassword=async(currentUser,userId,data)=>{

    try{
        const user=await User.findOne({_id:userId});
        /**
         * admin can update their own information
         * admin can update any other's user information
         * user with any role apart from admin can update their own information only
         * user with role apart from admin cannot update anybody else's information
         */


        if(currentUser.userType!=userTypes.admin && currentUser._id !=user._id){
            throw new Error(`current user with usertype: ${user.userType} is not allow to change the information of others`)
        }


        if(!data.oldpassword){
            throw new Error("invalid old password")
        }
        else if(data.oldpassword == data.newpassword){
            throw new Error("old password and new password are expected to be different")
        }
        const isValidPassword=bcrypt.compareSync(data.oldpassword,user.password ); 
        //first one is provided by us and second one is stored in db
        if(!isValidPassword){ 
            throw new Error("invalid password")
        }
        else{
            user.password=bcrypt.hashSync(data.newpassword,11);
            const updatedusernew=await User.findByIdAndUpdate({_id:userId},user,{new:true})
            // console.log("=======updatedusernew===========",updatedusernew)
            return updatedusernew
        }
    }catch(err){
        return{
            err:err.message
        }
    }

}

module.exports={updateuser,getAllUser,updatePassword}