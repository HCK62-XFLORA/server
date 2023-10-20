const express = require(`express`)
const UserController = require("../controllers/userController")
const userRouter = express.Router()

userRouter.post('/login', UserController.login)
userRouter.post('/register', UserController.register)
userRouter.patch('/reset-password/:token', UserController.resetPassword)
userRouter.get('/profile/:id', UserController.getUser)
userRouter.put('/profile/:id', UserController.updateProfile)
userRouter.post('/my-plant', UserController.addMyPlant)
userRouter.put('/my-plant/:id', UserController.updateMyPlant)
userRouter.delete('/my-plant/:id', UserController.removePlant)

module.exports = userRouter