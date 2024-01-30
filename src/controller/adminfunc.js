const user = require('./userservice');
   //Find a user by ID
    exports.findUser = async (req,res,next) => {
    try{
      const { userName} = req.body;

    // check user in the database
    const check = await user.checkUsername(userName);
    if (!check){
      return res.status(401).send({success : false , message : "Invalid Username"});
    }
    var data = await user.getUserbyusername(userName);
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

   // Delete a user
   exports.deletUser = async(req,res) => {
    try{
    const {userName} = req.body;
    const check = user.checkUsername(userName);
    if(!check){
      return res.status(404).send({success : false , message : "User Not Found"});
       }
       const del = await user.deleteUser(userName);
       res.status(200).json({
        status: 'success',
      });
    }
    catch(error){
      console.log(error);
      res.status(500).json({ message: error.message });
       } 
    }
    exports.getall = async (req, res) => {
      try {
        const all = await user.getallusers();
    
        // Use JSON.stringify with a replacer function to handle circular references
        const sanitizedData = JSON.stringify(all, (key, value) => {
          if (typeof value === 'object' && value !== null) {
            if (key === 'client' && value.constructor.name === 'MongoClient') {
              // Exclude the MongoDB client object
              return undefined;
            }
          }
          return value;
        });
    
        // Parse the JSON string back into an object
        const parsedData = JSON.parse(sanitizedData);
    
        res.status(200).json({ status: true, data: parsedData });
      } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ status: false, error: 'Internal Server Error' });
      }
    };
    
   