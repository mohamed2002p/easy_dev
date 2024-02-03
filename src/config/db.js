const  mongoose  = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const dbconn = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit();
    }
  };
  
module.exports = dbconn;