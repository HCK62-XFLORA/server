const express = require(`express`)
const router = express.Router()

const threadRouter = require("./threadRouter")
const errorHandler = require("../middlewares/errorHandler")
const userRouter = require("./userRouter")

router.get('/', (req, res) => {
    res.send("WELCOME TO EXPLORA")
})
router.use(`/threads`, threadRouter)
router.use('/users', userRouter)

router.use(errorHandler)



module.exports = router