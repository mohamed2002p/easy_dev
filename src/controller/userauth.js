const userservice = require('./userservice');
exports.login = async (req,res,next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }
        // Find user by email from the database
        const user = await userservice.checkUser(email);
if (!user) {
    return res.status(400).json({ error: 'User not found' });
}
// Compare password from the request with the hashed password in the database
const isPasswordMatch = await user.comparePassword(password);
if (!isPasswordMatch) {
    return res.status(400).json({ error: 'Invalid password' });
}
// Creating Token

let tokenData;
tokenData = { _id: user._id, email: user.email };

const token = await userservice.generateAccessToken(tokenData,"secret","1h")

res.status(200).json({ status: true, success: "sendData", token: token });
} catch (error) {
console.log(error, 'err---->');
next(error);
}
};
       
        
