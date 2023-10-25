const { Thread, User, Comment, Reaction, Forum } = require(`../models`)

const { uploadSingle, predict } = require("../helpers/tensorflow")

const { upload } = require(`../middlewares/imgBodyParser`)

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

class ThreadController {

    static async getThread(req, res, next) {
        try {
            const { ThreadId } = req.params

            const thread = await Thread.findByPk(ThreadId, { include: [{ model: Comment, include: [{ model: User, attributes: [`username`] }]}, { model: Reaction }, {model: User, attributes: ["username"]}] })
            if(!thread) return res.status(404).json({ message: `Thread not found!` })

            let likes = []
            let dislikes = []

            thread.Reactions.forEach((reaction) => {
                if(reaction.reaction == true){
                    likes.push(reaction)
                } else {
                    dislikes.push(reaction)
                }
            })

            thread.reaction = {
                likes: likes.length,
                dislikes: dislikes.length
            }
            
            res.json(thread)
        } catch (error) {
            next(error)
        }
    }

    static async getThreads(req, res, next) {
        try {
            const { nthThreads, ForumId } = req.query
            const limit = 5
            let option = { include: [`Reactions`], limit, offset: (nthThreads -1) * limit, order: [[`updatedAt`, `DESC`]]}

            if(!nthThreads) return res.status(400).json({ message: `Query cannot be empty` })

            if(ForumId) option.where = { ForumId }

            const threads = await Thread.findAll(option)

            res.json(threads)
        } catch (error) {
            next(error)
        }
    }

    static async postThread(req, res, next) {
        try {
            const { id } = req.user
            if(!req.file) return res.status(400).json({ message: `Image is required!` })
            const { file, body } = req
            const {  content, ForumId, title } = body
            const { location } = file

            const newThread = await Thread.create({ UserId: id, content, ForumId, imgUrl: location, title })
            res.status(201).json(newThread)
        } catch (error) {
                next(error)
        }
    }

    static async getThreadReactions(req, res, next) {
        try {
            const { ThreadId } = req.params

            const threadReactions = await Reaction.findAll({ where: { ThreadId } })
            if(!threadReactions) return res.status(404).json({ message: `Thread not found` })
            let likes = []
            let dislikes = []
            if(threadReactions.length != 0) {
                threadReactions.forEach((reaction) => {
                    if(reaction.reaction != false) {
                        likes.push(reaction)
                    } else {
                        dislikes.push(reaction)
                    }
                })
            }
            res.json({ likes: likes.length, dislikes: dislikes.length })
        } catch (error) {
            next(error)
        }
    }

    static async reactAThread(req, res, next) {
        try {
            const { id } = req.user
            const { ThreadId } = req.params
            const { reaction } = req.body

            const thread = await Thread.findByPk(ThreadId)
            const threadAuthor = await User.findByPk(thread.UserId)
            const checkUserReaction = await Reaction.findAll({ where: { UserId: id, ThreadId } })
            if(checkUserReaction.length !== 0) return res.status(404).json({ message: `You're already reacted to this thread!` })

            let newPoints = threadAuthor.point
            if(reaction) {
                newPoints += 1
            } else {
                newPoints -= 1
            }
            threadAuthor.update({ point: newPoints })

            const newReaction = await Reaction.create({ UserId: id, ThreadId, reaction})
            res.status(201).json(newReaction)
        } catch (error) {
            next(error)
        }
    }

    static async comment(req, res, next) {
        try {
            const { id } = req.user
            const { comment } = req.body
            const { ThreadId } = req.params

            const newComment = await Comment.create({ UserId: id, ThreadId, comment })
            const data = await Comment.findOne({where: {id: newComment.id}, include: [{model: User, attributes: ['username']}]})
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async askProblem(req, res, next) {
        try {
          const { questionType, message } = req.body; // Ambil tipe pertanyaan dan pesan dari req.body
          console.log(req.body);
          let content;
          if (questionType === "rekomendasi") {
            content = `Rekomendasi tanaman: ${message}`;
          } else if (questionType === "informasi") {
            content = `Informasi mengenai tanaman: ${message}`;
          } else if (questionType === "masalah") {
            content = `Masalah yang terkait dengan tanaman: ${message}`;
          } else {
            return res.status(400).json({ error: "Tipe pertanyaan tidak valid" });
          }
    
          const completion = await openai.chat.completions.create({
            messages: [
              {
                role: "user",
                content: `${content}`,
              },
            ],
            model: "gpt-3.5-turbo",
          });
    
          console.log("Sampe sini", completion);
          res.status(200).json(completion.choices);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
}

module.exports = ThreadController