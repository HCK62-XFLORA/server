const express = require(`express`)
const router = express.Router()

const threadRouter = require("./threadRouter")
const errorHandler = require("../middlewares/errorHandler")
const forumRouter = require("./forumRouter")
const AuthController = require("../controllers/authController")
const { authentication } = require("../middlewares/auth")
// const commentRouter = require("./commentRouter")

router.post('/login', AuthController.login)
// router.use(authentication)
router.use(`/threads`, threadRouter)
router.use(`/forums`, forumRouter)
// router.use('/comments', commentRouter )

router.use(errorHandler)



module.exports = router