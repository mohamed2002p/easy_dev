const   mongoose  = require("mongoose");
const bcrypt = require('bcrypt');
const db = require('../config/db');
const userSchema = new mongoose.Schema({
    userName: {
    type : String,
    required :true,
    unique :true,
    } ,
     email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    // @ts-ignore
    match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "userName format is not correct",
      ]
    },
    password: {
      type: String,
      required: true
    },
        inputs: [{
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true
        }
     }]
});
// used while encrypting user entered password
userSchema.pre("save",async function(){
  var user = this;
  if(!user.isModified("password")){
      return
  }
  try{
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password,salt);

      user.password = hash;
  }catch(err){
      throw err;
  }
});


//used while signIn decrypt
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
  } catch (error) {
      throw error;
  }
};

module.exports  = db.model('user', userSchema);