const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {User} = require('../models/index')

class UserController {
    static async login(req, res, next){
        try {
            const {email, password} = req.body

            if(!email){
                throw {name: "EmptyEmail"}
            }

            if(!password){
                throw {name: "EmptyPassword"}
            }

            const user =await User.findOne({where: email})

            if(!user || !comparePass(password, user.password)){
                throw {name: "Unauthorized"}
            }

            const access_token = generateToken({id: user.id})

            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next){
        try {
            const {email, password, username, birthday, gender} = req.body

            await User.create(req.body)

            res.status(201).json({message: "Create account success"})
        } catch (error) {
            next(error)
        }
    }

    static async resetPassword(res, res, next){
        try {
            
        } catch (error) {
            
        }
    }

    static async getUser(req, res, next){
        try {
            
        } catch (error) {
            
        }
    }

    static async updateProfile(req, res, next){
        try {
            
        } catch (error) {
            
        }
    }

    static async addMyPlant(req, res, next){
        try {
            
        } catch (error) {
            
        }
    }

    static async updateMyPlant(req, res, next){
        try {
            
        } catch (error) {
            
        }
    }

    static async removePlant(req, res, next){
        try {
            
        } catch (error) {
            
        }
    }
}

module.exports = UserController