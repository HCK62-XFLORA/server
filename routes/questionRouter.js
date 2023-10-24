const express = require(`express`)
const AskController = require("../controllers/askController")
const questionRouter = express.Router()

questionRouter.post(`/`, AskController.askProblem)

module.exports = questionRouter