const express = require(`express`)
const router = express.Router()

const threadRouter = require("./threadRouter")
const errorHandler = require("../middlewares/errorHandler")
const forumRouter = require("./forumRouter")

router.use(`/threads`, threadRouter)
router.use(`/forums`, forumRouter)

router.use(errorHandler)



module.exports = router