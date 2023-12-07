const  mongoose  = require("mongoose");
// const dbconn=async() => {
//    try{ 
//     const conn= await mongoose.connection("mongodb://127.0.0.1:27017/easy"); 
//     console.log('connected to the database')
//    }
// catch(error){
//     console.log(error);
//     process.exit(1);
// };
// }
const dbconn = mongoose.createConnection(`mongodb://127.0.0.1:27017/easy_dev`).on('open',()=>{console.log("MongoDB Connected");}).on('error',()=>{
    console.log("MongoDB Connection error");
});
module.exports = dbconn;