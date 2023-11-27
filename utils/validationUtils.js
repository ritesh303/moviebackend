const {userTypes,userStatus}=require('./constant')

const isvalidEmail=(email)=>{
    return String(email).toLocaleLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const isValidUserType=(userType)=>{
    const types=Object.values(userTypes)
    if(!types.includes(req.body.userType)){
        throw new Error(`value for field 'userType' is not valid,possible values are ${types}`)
    }
} 
const isValidUserStatus=(userStatusInfo)=>{
    const status=Object.values(userStatus)
    if(!status.includes(req.body.userStatusInfo)){
        throw new Error(`value for field 'userStatus' is not valid,possible values are ${status}`)
    }
} 

module.exports={isvalidEmail,isValidUserType,isValidUserStatus}