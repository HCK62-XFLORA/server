const express = require(`express`)
const router = express.Router()

const threadRouter = require("./threadRouter")
const userRouter = require("./userRouter")
const errorHandler = require("../middlewares/errorHandler")

router.use(`/threads`, threadRouter)
router.use('/users', userRouter)

router.use(errorHandler)



module.exports = router