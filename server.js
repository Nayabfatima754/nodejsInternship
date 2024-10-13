const express = require('express')
const app = express()
const passport = require('./passport'); // Import the passport config
const session = require('express-session');
const userRouter = require('./routers/userRouter')
const cookieParser = require('cookie-parser');
const configureJwtStrategy = require('./passportJWT');  // Your JWT strategy file


app.use(cookieParser());

const connectToDatabase =require('./db')
require('dotenv').config();

app.use(express.urlencoded({ extended: false }));

app.use(express.json())
const secretKey= process.env.SECRETKEY
app.use(session({
    secret: secretKey,  
    resave: false,            
    saveUninitialized: false, 
}));
// Initialize passport and session middleware
app.use(passport.initialize());
app.use(passport.session());  // Required if you're using sessions

configureJwtStrategy();

connectToDatabase()

app.use('/user',userRouter)

const Port = process.env.PORT || 3000;
app.listen(Port,(req,res)=>{
    console.log(`server listening on port ${Port}`);
})

