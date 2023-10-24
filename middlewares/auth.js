const { verifyToken } = require("../helpers/jwt")
const {User, Thread} = require('../models')

async function authentication(req, res, next){
    try {
        const {access_token} = req.headers
        const payload = verifyToken(access_token)
        console.log(payload)
        const user = await User.findByPk(payload.id)

        if(!user){
            throw {name: "Unauthorized"}
        }

        req.user = {id: user.id, username: user.username}
        next()
    } catch (error) {
        next(error)
    }
}

// async function usefulAuthorization(req, res, next){
//     try {
//         const {id, username} = req.user

//         const thread = await Thread.findByPk(req.params.id)

//         if(!thread){
//             throw {name: "NotFound"}
//         }

//         if(thread.UserId !== id){
//             throw {name: "Forbidden"}
//         }


//         next()
//     } catch (error) {
//         next(Error)
//     }
// }

module.exports = {
    authentication,
    // usefulAuthorization
}