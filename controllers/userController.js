const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {User, MyPlant, Plant} = require('../models/index')

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

            await User.create({email, password, username, birthday, gender})

            res.status(201).json({message: "Create account success"})
        } catch (error) {
            next(error)
        }
    }

    static async resetPassword(res, res, next){
        try {
            const {password} = req.body
            await User.update({password: password}, {where: {}})
            res.status(200).json({message: "Reset password success"})
        } catch (error) {
            next(error)
        }
    }

    static async getUser(req, res, next){
        try {
            const {id} = req.params
            const user = await User.findByPk(id, {include: {model: MyPlant}, where: {UserId: id}})

            if(!user){
                throw {name: "NotFound"}
            }

            res.status(200).json({user})
        } catch (error) {
            next(error)
        }
    }

    static async updateProfile(req, res, next){
        try {
            const {email, password, username, birthday, gender} = req.body
            const {id} = req.params
            const user = await User.findByPk(id)

            if(!user){
                throw {name: "NotFound"}
            }

            await User.update({email, password, username, birthday, gender}, {where: {id: id}})

            res.status(200).json({message: "Update user profile success"})
        } catch (error) {
            next(error)
        }
    }

    static async getPlants(req, res, next){
        try {
            const plants = await Plant.findAll()
            res.status(200).json({plants})
        } catch (error) {
            next(error)
        }
    }

    static async addMyPlant(req, res, next){
        try {
            const {PlantId, imgUrl} = req.body
            const {id} = req.user

            await MyPlant.create({PlantId, UserId: id, imgUrl})
            res.status(201).json({message: "Your plant added successfully"})
        } catch (error) {
            next(error)
        }
    }

    // static async updateMyPlant(req, res, next){
    //     try {
    //         const {PlantId, imgUrl} = req.body
    //         const {id} = req.user
    //         const {id: MyPlantId} = req.params

    //         const myPlant = await MyPlant.findByPk(MyPlantId)

    //         if(!myPlant){
    //             throw {name: "NotFound"}
    //         }
            
    //         await MyPlant.update({PlantId, UserId: id, imgUrl}, {where: {id: MyPlantId}})
    //         res.status(200).json({message: "Your plant updated successfully"})
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    static async removePlant(req, res, next){
        try {
            const {id} = req.params

            const myPlant = await MyPlant.findByPk(id)

            if(!myPlant){
                throw {name: "NotFound"}
            }

            await MyPlant.destroy({where: {id: id}})

            res.status(200).json({message: "Your plant deleted successfully"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController