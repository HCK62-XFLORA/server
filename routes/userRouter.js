const express = require(`express`)
const UserController = require("../controllers/userController")
const { upload } = require("../middlewares/imgBodyParser")
const { authentication } = require("../middlewares/auth")
const userRouter = express.Router()

userRouter.post('/login', UserController.login)
userRouter.post('/register', UserController.register)
userRouter.post('/forgot-password', UserController.forgetPassword)
userRouter.patch('/reset-password/:token', UserController.resetPassword)

userRouter.use(authentication)
userRouter.get(`/points`, UserController.getPoints)
userRouter.get('/profile/:id', UserController.getUser)
// userRouter.put('/profile/:id', UserController.updateProfile)
userRouter.get('my-plant', UserController.getMyPlant)
userRouter.get('/plants', UserController.getPlants)
userRouter.post('/my-plant', upload.single('image'), UserController.addMyPlant)
// userRouter.put('/my-plant/:id', UserController.updateMyPlant)
userRouter.delete('/my-plant/:id', UserController.removePlant)

userRouter.post(`/predict`, UserController.checkDisease)


module.exports = userRouter