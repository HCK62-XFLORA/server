const { verifyToken } = require("../helpers/jwt")
const {User, Thread} = require('../models')

async function authentication(req, res, next){
    try {
        const {access_token} = req.header

        const payload = verifyToken(access_token)

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

async function authorization(req, res, next){
    try {
        const {id, username} = req.user

        const thread = Thread.findByPk(req.params.id)

        if(!thread){
            throw {name: "NotFound"}
        }
    } catch (error) {
        
    }
}

module.exports = {
    authentication,
    authorization
}