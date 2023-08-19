const cors = require('cors');
const express = require('express')
const imageRouter = require('./controllers/image')
const app = express();



const Image = require('./model/image');

const userRouter = require('./Router/route')
const path = require('path')

app.use(cors());
app.use(express.json());

app.use(express.static('public'));
// app.use("/assets", express.static(path.join("public/assets")))
// app.use(express.static('public/assets'));
// app.use('/image', express.static('public/assets/'));


app.use('/user', userRouter);
app.use('/image', imageRouter);


module.exports = app;
