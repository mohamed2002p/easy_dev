const user = require('./userservice');
const bcrypt = require('bcrypt');


// Add a new user
 exports.addUser = async (req,res,next) => {
    try {
      const {userName, email, password } = req.body;
      const duplicate = await user.getUserByEmail(email);
      if (duplicate) {
          throw new Error(`UserName ${userName}, Already Registered`)
      }
      const response = await user.registerUser(userName,email, password);
      res.json({ status: true, success: 'User registered successfully' });      
  } catch (err) {
      console.log("---> err -->", err);
      next(err);
  }
}

   //Find a user by ID
    exports.findUser = async (req,res,next) => {
    try{
      const  userName = req.body;

    // check user in the database
    const check = await user.checkUsername(userName);
    console.log(check);
    if (!check){
      return res.status(401).send({success : false , message : "Invalid Username"});
    }
    var data = await user.getUserdata(check._id);
    res.status(200).json({
      status: 'success',
      results: data.length,
      data
    });
   }
   catch(error){
      console.log(error);
      res.status(500).json({ message: error.message });
   }
   }
   
   // Update a user
   exports.updateUser=async(req,res,next )=> {
      try{
    const updatedUser = req.body;
    const {userName} = updatedUser.userName;
    const check = await user.checkUsername(userName);
        if (!check) {
      return res.status(401).send({success : false , message : "Invalid Username Can't Update"});
    }
    const Update = await user.updateuser(updatedUser)
    res.status(200).json({
      status: 'success',
      results: Update
    });
   }
   catch(error){
      console.log(error);
      res.status(500).json({ message: error.message });   }
   }
   exports.updatepassworduser = async(req,res) => {
   try{
    const {userName,password} = req.body;
    const salt = 10;
    const Password = await bcrypt.hash(password,salt);
    const check = await user.checkUsername({userName});
   if(!check){
  return res.status(401).send({success : false , message : "Invalid Username Can't Update Password"});
   }
   var User = await user.getUserdata(check._id);
   const Updatepass = await user.updateuserpass(User,Password);
    res.status(200).json({
      status: 'success',
    });
   }
  catch(error){
    console.log(error);
    res.status(500).json({ message: error.message });
     }
  }
   // Delete a user
   exports.deletUser = async(req,res) => {
    try{
    const {userName} = req.body;
    const check = user.checkUseremail(userName);
    if(!check){
      return res.status(404).send({success : false , message : "User Not Found"});
       }
       const del = await user.deleteUser(check._id);
       res.status(200).json({
        status: 'success',
      });
    }
    catch(error){
      console.log(error);
      res.status(500).json({ message: error.message });
       } 
    }
   
   