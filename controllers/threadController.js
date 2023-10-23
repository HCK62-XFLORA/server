const { Thread, Comment, Reaction } = require(`../models`)

const { uploadSingle, predict } = require("../helpers/tensorflow")
const { io } = require("../bin/www")

class ThreadController {

    static async getThread(req, res, next) {
        try {
            const { ThreadId } = req.query

            const thread = await Thread.findByPk(ThreadId)
            if(!thread) return res.status(404).json({ message: `Thread not found!` })

            res.json(thread)
        } catch (error) {
            next(error)
        }
    }

    static async getThreads(req, res, next) {
        try {
            const { nthThreads, title } = req.query
            const limit = 5
            let option = { limit, offset: (nthThreads - 1) * limit, order: [[`updatedAt`, `ASC`]], attributes: { exclude: [`updatedAt`] }}

            if(title) option.where = { title }

            const threads = await Thread.findAll(option)
            res.json(threads)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async postThread(req, res, next) {
        try {
            // const { id } = req.user
            const { file, body } = req
            const {  content, ForumId } = body
            const { location } = file

            const newThread = await Thread.create({ UserId: 2, content, ForumId, imgUrl: location })
            res.status(201).json(newThread)
        } catch (error) {
           next(error) 
        }
    }

    static async editThread(req, res, next) {
        try {
            const { id } = req.user
            const { ThreadId } = req.params
            const { imgUrl, content, ForumId } = req.body

            const editedThread = await Thread.update({ imgUrl, ThreadId, content, ForumId }, { where: { id } })
            res.json(editedThread)
        } catch (error) {
            next(error)
        }
    }

    static async deleteThread(req, res, next) {
        try {
           const { id } = req.user
           const { ThreadId } = req.params

           const targetThread = await Thread.findByPk(ThreadId)
           if(!targetThread) return res.status(404).json({ message: `Thread not found!` })

           await Thread.destroy({ where: { id: ThreadId } })
           res.json({ message: `Thread deleted` })
        } catch (error) {
           next(error) 
        }
    }

    static async getThreadReactions(req, res, next) {
        try {
            const { id } = req.user
            const { ThreadId } = req.params

            const threadReactions = await Reaction.findAll({ where: { ThreadId } })
            const likes = threadReactions.filter((reaction) => threadReactions.reaction == true).length
            const dislikes = threadReactions.filter((reaction) => threadReactions.reaction == false).length
            res.json({ likes, dislikes })
        } catch (error) {
            next(error)
        }
    }

    static async reactAThread(req, res, next) {
        try {
            const { id } = req.user
            const { ThreadId } = req.params
            const { reaction } = req.body

            const checkUserReaction = await Reaction.findAll({ where: { UserId: id, ThreadId } })
            if(checkUserReaction) return res.status(404).json({ message: `You're already reacted to this thread!` })

            const newReaction = await Reaction.create({ UserId: id, ThreadId, reaction})
            res.status(201).json(newReaction)
        } catch (error) {
            next(error)
        }
    }

    static async unreactAThread(req, res, next) {
        try {
            const { id } = req.user
            const { ThreadId } = req.params

            const unreact = await Reaction.destroy({ where: { UserId: id, ThreadId } })
            res.json(unreact)
        } catch (error) {
            next(error)
        }
    }

    static async getThreadComment(req, res, next) {
        try {
            const { ThreadId } = req.params

            const threadComments = await Comment.findAll({ where: { ThreadId } })
            if(!threadComments) return res.status(404).json({ message: `There is no such a thread with id ${ThreadId}` })
            res.json(threadComments)
        } catch (error) {
            next(error)
        }
    }

    static async comment(req, res, next) {
        try {
            const { id } = req.user
            const { ThreadId, comment } = req.body

            const newComment = await Comment.create({ UserId: id, ThreadId, comment })
            res.status(201).json(newComment)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getPoints(req, res, next) {
        try {
            // const { id } = req.user

            const threads = await Thread.findAll({ include: [`Comments`, `Reactions`], where: { UserId: 2 } })
            // console.log(threads)
            const likes = threads.map((thread) => {
                if(thread.Reactions.reaction) {
                    return thread.Reaction
                }
            })
            const dislikes = threads.map((thread) => {
                if(!thread.Reactions.reaction) {
                    return thread.Reaction
                }
            })

            const threadCount = threads.length
            // const comments = threads.map((thread) => {
            //     return threads.Comments
            // })
            res.json({ likes, dislikes, comments })
        } catch (error) {
            next(error)
        }
    }

    static async checkDisease(req, res, next) {
        try {
            uploadSingle(req, res, (error) => {
                if(error) return res.status(400).json({ message: `Only images are allowed!` })

                predict(req.file.path)
                .then((prediction) => {
                    res.json(prediction)
                })
                .catch((error) => {
                    throw error
                })
            })
        } catch (error) {
          next(error)  
        }
    }
}

module.exports = ThreadController