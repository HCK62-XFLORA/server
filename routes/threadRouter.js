const express = require(`express`)
const threadRouter = express.Router()
const ThreadController = require("../controllers/threadController")

const { upload } = require("../middlewares/imgBodyParser")
const { authentication } = require("../middlewares/auth")

threadRouter.get(`/`, ThreadController.getThreads)

threadRouter.get(`/:ThreadId`, ThreadController.getThread)

// threadRouter.use(authentication)
threadRouter.post(`/`, upload.single(`image`), ThreadController.postThread)
threadRouter.put(`/:ThreadId`, ThreadController.editThread)
threadRouter.delete(`/:ThreadId`, ThreadController.deleteThread)

threadRouter.get(`/reaction/:ThreadId`, ThreadController.getThreadReactions)
threadRouter.post(`/reaction/:ThreadId`, ThreadController.reactAThread)
threadRouter.delete(`/reaction/:ThreadId`, ThreadController.unreactAThread)

threadRouter.get(`/comments/:ThreadId`, ThreadController.getThreadComment)
threadRouter.post(`/comments/:ThreadId`, ThreadController.comment)


module.exports = threadRouter