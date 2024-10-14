const express = require('express')
const { register, login, update, deleteUser, allUsers,searchUserWithID,searchUserWithEmail,searchUsers } = require('../controllers/user');
const isAdmin = require('../middlewares/adminMiddleware')
const passport = require('passport'); // Make sure to import passport

const isAuthenticated=require ('../middlewares/authentication')
const configureJwtStrategy = require('../passportJWT')
configureJwtStrategy(); // Call this to configure the JWT strategy

const Router = express.Router();
Router.post('/register',register)
Router.post('/login',login)
Router.put('/:id',isAuthenticated,update)
Router.delete('/:id',isAuthenticated,isAdmin,deleteUser)
Router.get('/allUsers', passport.authenticate('jwt', { session: false }), allUsers); // Use passport middleware here
Router.get('/search-email',searchUserWithEmail)
Router.get('/:id',searchUserWithID)
Router.get('/search-users',isAuthenticated,isAdmin,searchUsers)


module.exports=Router;