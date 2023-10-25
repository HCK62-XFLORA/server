const express = require(`express`)
const threadRouter = express.Router()
const ThreadController = require("../controllers/threadController")

const { upload } = require("../middlewares/imgBodyParser")
const { authentication } = require("../middlewares/auth")

threadRouter.use(authentication)

threadRouter.get(`/reaction/:ThreadId`, ThreadController.getThreadReactions)
threadRouter.post(`/reaction/:ThreadId`, ThreadController.reactAThread)

threadRouter.post(`/comments/:ThreadId`, ThreadController.comment)

threadRouter.get(`/`, ThreadController.getThreads)
threadRouter.post(`/`, upload.single(`image`), ThreadController.postThread)

threadRouter.post(`/ask`, ThreadController.askProblem)

threadRouter.get(`/:ThreadId`, ThreadController.getThread)


module.exports = threadRouter