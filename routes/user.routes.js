const userController=require('../controllers/user.controller')
const {verifyUserWithToken,isAdmin,isUserStatusApproved}=require('../middlewares/auth/authjwtToken')
const {verifyUpdatePasswordRequest,verifyUpdateUserInformationRequest}=require('../middlewares/auth/user/requestValidator')

module.exports=function(app){
    //to update users
    app.put('/mba/api/v1/user/:id',[verifyUpdateUserInformationRequest,verifyUserWithToken,isUserStatusApproved],userController.updateuser);

    //to get all the user
    app.get('/mba/api/v1/user',[verifyUserWithToken,isAdmin,isUserStatusApproved],userController.getAllUser)
    console.log("==============routes================")

    //update user's password
    app.put('/mba/api/v1/user/:id/updatePassword',[verifyUpdatePasswordRequest,verifyUserWithToken,isAdmin,isUserStatusApproved],userController.updateuserpassword)
}