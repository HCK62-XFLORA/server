const express = require('express')
const ForumController = require('../controllers/forumController')
const forumRouter = express.Router()

forumRouter.get(`/`, ForumController.getForums)
forumRouter.get('/:forumId', ForumController.getForumsById)
module.exports = forumRouter