const express = require(`express`)
const router = express.Router()

const threadRouter = require("./threadRouter")

router.use(`/threads`, threadRouter)



module.exports = router