const router = require("express").Router();
const userRoute = require('../controller/adminfunc');
const admin = require('../controller/adminverif');
const userauth = require('../controller/userauth');
router.post("/sms", admin.verif);
router.post("/register" , userRoute.addUser);
router.post("/login", userauth.login);
router.post("/findUser",userRoute.findUser);
router.post("/update",userRoute.updateUser);
router.post("/updatepass",userRoute.updatepassworduser);
router.post("/delete",userRoute.deletUser);

module.exports = router;
