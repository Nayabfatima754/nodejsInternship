const express = require('express')
const app = express()
const user = require('./routers/userRouter')

app.use('/user',user)

const Port = 3000;
app.listen(Port,(req,res)=>{
    console.log(`server listening on port ${Port}`);
})
