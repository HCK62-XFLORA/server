const express = require(`express`)
const UserController = require("../controllers/userController")
const { upload } = require("../middlewares/imgBodyParser")
const { authentication } = require("../middlewares/auth")
const userRouter = express.Router()

userRouter.post('/login', UserController.login)
userRouter.post('/register', UserController.register)

userRouter.use(authentication)
userRouter.get('/profile/:id', UserController.getUser)
userRouter.get('/my-plant', UserController.getMyPlant)
userRouter.get('/plants', UserController.getPlants)
userRouter.post('/my-plant', upload.single('image'), UserController.addMyPlant)
userRouter.get('/my-plant/:id', UserController.getSingleMyPlant)

userRouter.post(`/predict/:id`, UserController.checkDisease)

userRouter.get('/reward', UserController.getReward)
userRouter.get('/reward/:id', UserController.rewardById)
userRouter.get('/my-reward', UserController.getMyReward)
userRouter.patch('/claim-reward/:rewardId', UserController.claimReward)


module.exports = userRouter