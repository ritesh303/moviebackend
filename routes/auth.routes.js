const authController=require('../controllers/auth.controller');
const{verifySignupRequest,verifySigninRequest}=require('../middlewares/auth/requestValidator')



module.exports=function(app){
    //to create or register a new user
    app.post('/mba/api/v1/auth/signup',[verifySignupRequest],authController.signup)

    //to signIn a user
    app.post('/mba/api/v1/auth/signin',[verifySigninRequest],authController.signin)
}