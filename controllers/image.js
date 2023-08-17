const imageRouter = require('express').Router();
const multer = require("multer");
const Image = require('../model/image');
const User = require('../model/user');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/');
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

imageRouter.post("/", upload.single("profile"), async (req, res) => {
    console.log(req.body);
    const id = req.body
    const imageName = req.file.filename;

    try {
        const user = await User.findOne(id);
        const saveimage = new Image({
            image: imageName,
            userId: id
        })
        await saveimage.save();
        user.imageId = user.imageId.concat(saveimage._id);
        await user.save();
        res.status(200).json({ message: "image added successfully" })
        res.json({ status: "ok" });
    } catch (error) {
        res.json({ status: error });
    }
});
module.exports = imageRouter;