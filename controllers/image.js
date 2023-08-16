const imageRouter = require('express').Router();
const multer = require("multer");
const Image = require('../model/image');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "assets/");
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

imageRouter.post("/", upload.single("profile"), async (req, res) => {
    console.log(req.body);
    const imageName = req.file.filename;
    try {
        await Image.save({ image: imageName });

        res.json({ status: "ok" });
    } catch (error) {
        res.json({ status: error });
    }
});
module.exports = imageRouter;