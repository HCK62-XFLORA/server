const express = require(`express`)
const router = express.Router()

const threadRouter = require("./threadRouter")
const errorHandler = require("../middlewares/errorHandler")

router.use(`/threads`, threadRouter)

router.use(errorHandler)



module.exports = router