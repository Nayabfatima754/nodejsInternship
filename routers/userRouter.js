const express = require('express')
const {register,login,update,deleteUser,allUsers} = require('../controllers/user')

const Router = express.Router();
Router.post('/register',register)
Router.post('/login',login)
Router.put('/:id',update)
Router.delete('/:id',deleteUser)
Router.get('/allUsers',allUsers)

module.exports=Router;