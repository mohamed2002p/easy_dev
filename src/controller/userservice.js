const userSchema = require("../model/user");
class UserServices{
 
    static async registerUser(userName,password,){
        try{
                const createUser = new userSchema({userName,password});
                return await createUser.save();
        }catch(err){
            throw err;
        }
    }
    static async checkUsername(userName){
        try {
            return await userSchema.findOne({userName});
        } catch (error) {
            throw error;
        }
    }
    static async checkUserid(id){
        try {
            return await userSchema.findOne({id});
        } catch (error) {
            throw error;
        }
    }
    static async getUserdata(id){
        try {         
            return await userSchema.findById(id);
        } 
         catch (err) {
            throw err;
        }
    }
    static async getUserbyusername(userName){
        try {         
            return await userSchema.findOne({userName});
        } 
         catch (err) {
            throw err;
        }
    }
        static async updateuser(user){
        try{
            const res = await userSchema.updateOne(user);
        return res;
        }
        catch(error){
        throw error;
        }
        }
        static async updateuserpass(id,password){
            try{
                const user = await userSchema.findOne(id).select('password');
                user.password = password;
                await user.save();
            }
            catch(error){
            throw error;
            }
        }
        static async deleteUser(userName){
            return await userSchema.deleteOne({userName});
        }
        static getallusers(){
            try{
            return  userSchema.find({});
        }catch(err){
        throw err
        }
       }
}

module.exports = UserServices;