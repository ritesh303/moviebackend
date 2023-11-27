const mongoose=require('mongoose');
const {userTypes,userStatus}=require('../utils/constant')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{  
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    userType:{
        type:String,
        enum:[userTypes.customer,userTypes.admin,userTypes.client],
        default:userTypes.customer
    },
    bookings:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:'Booking'
    },
    userStatus:{
        type:String,
        enum:[userStatus.approved,userStatus.pending,userStatus.suspended,userStatus.rejected],
        default:userStatus.approved
    },
    createdAt:{
        type:Date,
        reuired:true,
        default:Date.now(),
        immutable:true
    },
    updatedAt:{
        type:Date,
        reuired:true,
        default:Date.now()
    },

    
})
userSchema.pre('save', function(next) {
    const hashedPasword=bcrypt.hashSync(this.password,11)
    this.password=hashedPasword
    next();
  });

module.exports=mongoose.model("User",userSchema) 