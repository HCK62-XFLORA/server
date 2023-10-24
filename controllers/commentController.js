const { Comment } = require("../models")



module.exports = class CommentController {
  
    static async postComment(ThreadId, comment, UserId){
      try {
        const newComment = await Comment.create({ThreadId, comment, UserId })
        

        return newComment
      } catch (error) {
        console.log(error, "<<<");
      }
    }
}