const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const passport = require('../passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');  // Ensure you import jsonwebtoken

 const register = async(req,res)=>{
    const {username,email,password,userType}=req.body;
    try{
        if(!username || !email || !password ||!userType){
            return res.status(400).json({message:"All fields are mendatory"})
        }
        const userAvailable = await User.findOne({email})
        if(userAvailable){

            return res.status(400).json({message:"this email is already registered"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({
            username,
            email,
            password:hashedPassword,
            userType,
        });
        if(newUser){
            return res.status(200).json({_id:newUser._id,email:newUser.email})
        }else{
            return res.status(400).json({ message: 'User data is not valid' });

        }

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error"})
    }
 };
 const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);  // Handle server errors
        }
        if (!user) {
            // Authentication failed
            return res.status(401).json({ message: info.message });
        }

        // Manually log in the user if authentication is successful
        req.logIn(user, (err) => {
            if (err) {
                return next(err);  // Handle login errors
            }
            const token = jwt.sign(
                { id: user._id, email: user.email },  // Payload with user details
                process.env.JWTSECRETKEY,             // Secret key from .env
                { expiresIn: '1h' }                   // Token expiration time (e.g., 1 hour)
            );
    

            // If login is successful, return success response
            return res.status(200).json({ message: 'Login successful', user,token });
        });
    })(req, res, next);  // Immediately invoke passport.authenticate with req, res, next
};
const update = async (req, res) => {
    const userId = req.params.id;
    const { username, password, userType } = req.body; // Added userType

    try {
        if (!userId) {
            return res.status(400).json({ message: "Please provide the userId you want to update" });
        }
       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedData = { username, userType }; // Construct update data

        // Only hash the password if it was provided
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        return res.status(200).json({ message: `User information updated successfully`, updatedUser });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
    const deleteUser = async(req,res)=>{
        const userId = req.params.id;
        try{
            if(!userId){
                return res.status(400).json({message:"please provide id"})
            }
            const user = await User.findByIdAndDelete(userId)
            if(!user){
                return res.status(404).json({message:"user not found"})
            }
            return res.status(200).json({message:"user deleted successfully"})

        }catch(err){
            console.log(err)
            return res.status(500).json({message:"internal server error"})
        }
    }
    const allUsers = async(req, res) => {
        // Authenticate using JWT strategy
       
            try {
                // Fetch all users from the database
                const Allusers = await User.find(); // Ensure 'Allusers' is used consistently
                if (Allusers.length <= 0) {
                    return res.status(404).json({ message: "Users not found" });
                }
                // Return all users in the response
                return res.status(200).json({ message: "All Users", users: Allusers });
            } catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error" });
            }
        } 

        const searchUserWithID = async (req, res) => {
            const userID = req.params.id;
            
            try {
                if (!userID) {
                    return res.status(400).json({ message: "Please provide the user ID you want to search" });
                }
        
                // Search for the user by ID and return the 'name' and 'email' fields only
                const user = await User.findById(userID, { name: 1, email: 1 });
                
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
        
                return res.status(200).json(user);
            } catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error" });
            }
        };
        
    const searchUserWithEmail = async (req, res) => {
        const { email } = req.body;  // Extract email from request body
        try {
            if (!email) {
                return res.status(400).json({ message: "Please provide the user email you want to search" });
            }
    
            // Search for user with the provided email and return only the 'name' field
            const user = await User.findOne({ email: email }, { name: 1 });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
//aggregation pipeline
    const searchUsers= async(req,res)=>{
        const {userType}=req.body
        try{
            if(!userType){
                return res.status(400).json({ message: "Please provide userType" });

            }
            const users = await User.aggregate([
               { $match:{userType:"customer"} },
               { $group:{
                _id: "$_id",           // Use `_id` to retain unique users
                    name: { $first: "$name" },    // Project 'name' field
                    email: { $first: "$email" },  // Project 'email' field
                    userType: { $first: "$userType" } // Project 'userType' field
                }}
            ])
            if(!users){
                return res.status(404).json({message:"user not found"})
            }
            return res.status(200).json({users})

        }catch(err){
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }}
    
    module.exports = { register, login, update, deleteUser, allUsers,searchUserWithID ,searchUserWithEmail,searchUsers};
    
