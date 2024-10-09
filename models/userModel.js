const mongoose = require('mongoose')
const user = new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    email:{
        require:true,
        type:String,
    },
    password:{
        require:true,
        type:String
    }
})
const User = mongoose.model('User',user)
module.exports=User