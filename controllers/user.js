const User = require('../models/userModel')

 
 const register = async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are mendatory"})
        }
        const userAvailable = await User.findOne({email})
        if(userAvailable){

            return res.status(400).json({message:"this email is already registered"})
        }
        const newUser = await User.create({
            username,
            email,
            password
        });
        if(newUser){
            return res.status(200).json({_id:newUser._id,email:newUser.email})
        }else{
            return res.status(400).json({ message: 'User data is not valid' });

        }

    }catch(err){
        console.log(err)
        return res(500).json({message:"Internal server error"})
    }
 };
 const login= async(req,res)=>{
    const{email,password}=req.body
    try{
        if(!email||!password){
            return res(400).json({message:"please enter email and password"})
        }
        const User = await User.findOne({email,password})
        if(User){
            return res(404).json({message:"user not found"})
        }
        return res(200).json({message:"login successfull"})
    }catch(err){
        console.log(err)
        return res(500).json({message:"internal server error"})
    }
 };
 const update = async(req,res)=>{
    const userId = req.params.id;
    const {username,password}=req.body
    try{

        if(!userId){
            return res.status(400).json({message:"please provide userId you want to update"})
        }
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const updateUser = await User.findByIdAndUpdate(userId,{username,password},{new:true})
        return res.status(200).json({message:`user information updates successfull ${updateUser}`})

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }};
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
    const allUsers= async(req,res)=>{
        try{
            const Allusers = await User.find()
            if(Allusers.length<=0){
                return res.status(404).json({message:"users not found"})
            }
            return res.status(200).json({message:`All Users ${allusers}`})
        }catch(err){
            console.log(err)
            return res.status(500).json({message:"internal server error"})
        }
    }
 module.exports ={register,login,update,deleteUser,allUsers}