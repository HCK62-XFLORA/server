const { Forum } = require("../models")

module.exports = class ForumController {

    static async getForums(req, res, next){
      try {
        const forums = await Forum.findAll({
          attributes: {
            exclude:  ['createdAt', 'updatedAt'] 
          }
        })
        res.json(forums)
      } catch (error) {
        next(error)
      }
    }

    static async getForumsById(req, res, next){
      try {
        const { forumId } = req.params
        const forum = await Forum.findByPk(+forumId, {
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        });

        if (!forum) {
          throw { name: "NotFound" };
        }

        res.status(200).json(forum)
      } catch (error) {
        next(error)
      }
    }
}