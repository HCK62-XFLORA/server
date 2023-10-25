const { verifyToken } = require("../helpers/jwt")
const { User } = require('../models')

async function authentication(req, res, next){
    try {
        const {access_token} = req.headers
        const payload = verifyToken(access_token)
        const user = await User.findByPk(payload.id)

        if(!user){
            return res.status(401).json({ message: `User not found` })
        }

        req.user = {id: user.id, username: user.username}
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    authentication
}