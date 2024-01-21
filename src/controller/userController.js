const UserServices = require('./userservice');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
exports.register = async (req,res,next) => {
    try {
      const {userName, password } = req.body;
      const duplicate = await UserServices.getUserByEmail(email);
      if (duplicate) {
          throw new Error(`UserName ${userName}, Already Registered`)
      }
       await UserServices.registerUser(userName, password);
      res.json({ status: true, success: 'User registered successfully' });      
  } catch (err) {
      console.log("---> err -->", err);
      next(err);
  }
}
dotenv.config();

exports.login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            throw new Error('Parameters are not correct');
        }

        let user;

        // Check if the login is for an admin
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (userName === adminUsername && password === adminPassword) {
            // Admin login
            user = { role: 'admin', username: adminUsername };
        } else {
            // Regular user login
            user = await UserServices.checkUsername(userName);

            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }

            // Compare password from the request with the hashed password in the database
            const isPasswordMatch = await user.comparePassword(password);
            if (!isPasswordMatch) {
                return res.status(400).json({ error: 'Invalid password' });
            }
        }

        res.status(200).json({ status: true, user });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.updatepassworduser = async(req,res) => {
    try{
     const {userName,password} = req.body;
     const salt = 10;
     const Password = await bcrypt.hash(password,salt);
     const check = await UserServices.checkUsername({userName});
    if(!check){
   return res.status(401).send({success : false , message : "Invalid Username Can't Update Password"});
    }
    var User = await user.getUserdata(check._id);
      await UserServices.updateuserpass(User,Password);
     res.status(200).json({
       status: 'success',
     });
    }
   catch(error){
     console.log(error);
     res.status(500).json({ message: error.message });
      }
   }
