const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");

class UserServices{
 
    static async registerUser(userName,email,password,){
        try{
                const createUser = new UserModel({userName,email,password});
                return await createUser.save();
        }catch(err){
            throw err;
        }
    }

    static async getUserByEmail(email){
        try{
            return await UserModel.findOne({email});
        }catch(err){
            console.log(err);
        }
    }

    static async checkUseremail(email){
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            throw error;
        }
    }
    static async checkUsername(userName){
        try {
            return await UserModel.findOne(userName);
        } catch (error) {
            throw error;
        }
    }
    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }
    static async getUserdata(id){
        try {         
            return await UserModel.findById(id);
        } 
         catch (err) {
            throw err;
        }
    }
        static async getallusers({users}){
            try{
          return await UserModel.find({users});
            }
            catch(error){
                throw error;
            }
        }
        static async updateuser(user){
        try{
            const res = await UserModel.updateOne(user);
        return res;
        }
        catch(error){
        throw error;
        }
        }
        static async updateuserpass(id,password){
            try{
                const user = await UserModel.findOne(id).select('password');
                user.password = password;
                await user.save();
            }
            catch(error){
            throw error;
            }
        }
        static async deleteUser(id){
            return await UserModel.deleteOne(id);
        }
    }
module.exports = UserServices;