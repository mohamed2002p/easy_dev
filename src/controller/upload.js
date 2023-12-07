const multer = require('multer');
const sharp = require('sharp');
const User = require('../model/user');

const upload = multer({
    array: 'avatars',
    limits: {
        fileSize: 1000000 // 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a jpg, jpeg, or png image file'));
        }
        cb(undefined, true);
    }
});

const resize = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    req.file.filename = `user-${req.user.id}-${Date.now()}.png`;

    await sharp(req.file.path)
        .resize({ width: 250, height: 250 })
        .toFormat('png')
        .jpeg({ quality: 90 })
        .toFile(req.file.destination + '/' + req.file.filename);

    fs.unlinkSync(req.file.path);

    next();
};

const saveAvatar = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const user = await User.findByIdAndUpdate(req.user.id, { avatar: req.file.filename }, { new: true });

    if (!user) {
        return next(new Error('User not found'));
    }

    req.user = user;
    next();
};

const uploadAvatar = [
    upload.array('avatar'),
    resize,
    saveAvatar
];

module.exports = uploadAvatar;