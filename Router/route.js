const userRouter = require('express').Router();
const usercontroller = require('../controllers/userControllers');
const authmiddleware = require('../middleware/authmiddleware');
const incomecontroller = require('../controllers/incomeControllers');

userRouter.post('/signup', usercontroller.signup);
userRouter.post('/signin', usercontroller.signin);
userRouter.get('/list', usercontroller.list);
userRouter.post('/forgot', usercontroller.forgot);
userRouter.post('/reset', usercontroller.reset);


const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

// const upload = multer({ storage: storage });
const upload = multer({ dest: 'assets/' });
console.log(upload.single('profile'))
userRouter.get('/updateuser', authmiddleware.verifyToken, usercontroller.getprofile);
userRouter.put('/updateuser', authmiddleware.verifyToken, usercontroller.updateUser);
userRouter.post('/incomedata', authmiddleware.verifyToken, incomecontroller.dataEntry);
userRouter.get('/graph', authmiddleware.verifyToken, incomecontroller.graph)
module.exports = userRouter;