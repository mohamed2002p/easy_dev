const UserModel = require("../model/user");
class UserServices{
 
    static async registerUser(userName,password,){
        try{
                const createUser = new UserModel({userName,email,password});
                return await createUser.save();
        }catch(err){
            throw err;
        }
    }
    static async checkUsername(userName){
        try {
            return await UserModel.findOne({userName});
        } catch (error) {
            throw error;
        }
    }
    static async checkUserid(id){
        try {
            return await UserModel.findOne({id});
        } catch (error) {
            throw error;
        }
    }
    static async getUserdata(id){
        try {         
            return await UserModel.findById(id);
        } 
         catch (err) {
            throw err;
        }
    }
    static async getUserbyusername(userName){
        try {         
            return await UserModel.findOne({userName});
        } 
         catch (err) {
            throw err;
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
        static async deleteUser(userName){
            return await UserModel.deleteOne({userName});
        }
        static async addContent(userName,title,description){
            // Push the new data to the arrays
            try{
            let update = {
               $push: {
                 title: title,
                 description: description,
               }
            };  
            // Find the document with the given userName and update it
            await UserModel.findOneAndUpdate({ userName: userName }, update);
           }
           catch(e){
            throw e;
           }
    }
        static getallusers(){
            try{
            return  UserModel.find({});
        }catch(err){
        throw err
        }
       }
}

module.exports = UserServices;