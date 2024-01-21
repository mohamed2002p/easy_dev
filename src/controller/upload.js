const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs').promises; // Using promises version
const User = require('../model/user');
class avatar{
static upload = multer({
    field : "avatar",
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1000000 // 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a jpg, jpeg, or png image file'));
        }
        cb(null, true);
    }
});

 static resizeAndSave = async (file, userId, index) => {
    const imageBuffer = file.buffer;
    const filename = `user-${userId || 'unknown'}-${Date.now()}-${index}.png`;

    const destinationDir = './public/upload';
    await fs.mkdir(destinationDir, { recursive: true });

    await sharp(imageBuffer)
        .resize({ width: 1000, height: 1000 })
        .toFormat('png')
        .jpeg({ quality: 100 })
        .toFile(`${destinationDir}/${filename}`);

    return filename;
};

 static resizeMultiple = async (files, userId) => {
    const promises = files.map(async (file, index) => {
        return await this.resizeAndSave(file, userId, index);
    });
    return Promise.all(promises);
};
    
 static saveAvatar = async (userName, filenames) => {
    const user = await User.findOneAndUpdate(
        { userName : userName },
        { $push: { image: { $each: filenames } } },
        { new: true }
    );

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};
}
module.exports = avatar;