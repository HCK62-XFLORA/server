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
}