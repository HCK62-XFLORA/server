const express = require(`express`)
const ThreadController = require("../controllers/threadController")
const threadRouter = express.Router()

threadRouter.get(`/`, ThreadController.getThreads)

module.exports = threadRouter