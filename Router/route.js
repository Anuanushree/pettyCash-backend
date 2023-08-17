const userRouter = require('express').Router();
const usercontroller = require('../controllers/userControllers');
const authmiddleware = require('../middleware/authmiddleware');
const incomecontroller = require('../controllers/incomeControllers');

userRouter.post('/signup', usercontroller.signup);
userRouter.post('/signin', usercontroller.signin);
userRouter.get('/list', usercontroller.list);
userRouter.post('/forgot', usercontroller.forgot);
userRouter.post('/reset', usercontroller.reset);


userRouter.get('/updateuser', authmiddleware.verifyToken, usercontroller.getprofile);
userRouter.put('/updateuser', authmiddleware.verifyToken, usercontroller.updateUser);
userRouter.post('/incomedata', authmiddleware.verifyToken, incomecontroller.dataEntry);
userRouter.get('/graph', authmiddleware.verifyToken, incomecontroller.graph)
userRouter.put('/incomeEdit', authmiddleware.verifyToken, incomecontroller.dataEdit);
userRouter.delete('/incomedelete/:id', authmiddleware.verifyToken, incomecontroller.datadelete)



module.exports = userRouter;
