const cors = require('cors');
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fileUpload = require('express-fileupload')
const path = require('path')
const app = express();
const multer = require('multer')


const Image = require('./model/image');

const userRouter = require('./Router/route')


app.use(cors());
app.use(express.json());



app.use('/user', userRouter);
// app.use('/image', imageRouter);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/assets');
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/image", upload.single("profile"), async (req, res) => {
    console.log(req.body);
    const imageName = req.file.filename;
    try {

        await Image.create({ image: imageName });
        res.json({ status: "ok" });
    } catch (error) {
        res.json({ status: error });
    }
});
// app.get('/image')


module.exports = app;
