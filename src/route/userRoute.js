const router = require("express").Router();
const userRoute = require('../controller/adminfunc');
const userController = require('../controller/userController');
const upload = require('../controller/upload');
const UserServices = require('../controller/userservice'); 
router.post("/register" , userController.register);
router.post("/login", userController.login);
router.get("/findUser",userRoute.findUser);
router.post("/update",userRoute.updateUser);
router.post("/updatepass",userController.updatepassworduser);
router.post("/delete",userRoute.deletUser);
router.get("/getall",userRoute.getall);
router.post('/content', upload.upload.array('avatar'), async (req, res) => {
    try {
        const { userName, title, description } = req.body;
        // const userId = req.user.id; // Assuming you have user information in the request

        const check = UserServices.checkUsername(userName);
        if (!check) {
            return res.status(401).json({ message: 'Invalid user' });
        }
        // Process and save avatars
        const filenames = await upload.resizeMultiple(req.files, userName);
        await upload.saveAvatar(userName, filenames);

        res.json({ status: true, message: 'Content and avatar uploaded successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;
