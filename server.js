const express=require('express');
const {PORT}=require('./config/server.config')
const {DB_URL,DB_NAME}=require('./config/db.config')
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const appRoutes=require('./routes/movie.routes')
const theatreRoutes=require('./routes/theatre.routes');
const authControllerRoutes=require('./routes/auth.routes')
const userRoutes=require('./routes/user.routes')
const bookingRoutes=require('./routes/booking.routes')


//initialise the app
const app=express()



//adding middlwares

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));


//connecting to db

mongoose.connect(DB_URL).catch((err)=>{console.log('could not connect to the server',err)})

appRoutes(app)
theatreRoutes(app)
authControllerRoutes(app)
userRoutes(app)
bookingRoutes(app)

app.listen(PORT,()=>{
    console.log("app is listening to the server",PORT)
})