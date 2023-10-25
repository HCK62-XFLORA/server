const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {User, MyPlant, Plant, Reward, MyReward, Thread} = require('../models/index')
const { uploadSingle, predict } = require('../helpers/tensorflow')

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

            const user =await User.findOne({where: {email: email}})

            if(!user || !comparePass(password, user.password)){
                throw {name: "Unauthorized"}
            }

            const access_token = generateToken({id: user.id})

            res.status(200).json({access_token, id: user.id})
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next){
        try {
            const {email, password, username, birthday, gender} = req.body

            const user = await User.create({email, password, username, birthday, gender})

            res.status(201).json({id: user.id, email: email})
        } catch (error) {
            next(error)
        }
    }

    static async getUser(req, res, next){
        try {
            const {id} = req.params
            const data = await User.findByPk(id)

            if(!data){
                throw {name: "NotFound"}
            }

            if(data.point >= 1000){
                await User.update({badge: "Expert"})
            } else if (data.point >= 500){
                await User.update({badge: "Intermediate"})
            }

            const user = await User.findByPk(id, {include: [{
                model: MyPlant,
                include: [Plant]
            }, 'Threads', {model: MyReward, include: [Reward]}], where: {UserId: id}, attributes : { exclude: ['password']}})

            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async getMyPlant(req, res, next){
        try {
            const {id} = req.user
            const myPlant = await MyPlant.findAll({include: Plant}, {where: {UserId: id}})

            res.status(200).json(myPlant)
        } catch (error) {
            next(error)
        }
    }

    static async getPlants(req, res, next){
        try {
            const plants = await Plant.findAll()
            res.status(200).json(plants)
        } catch (error) {
            next(error)
        }
    }

    
    static async addMyPlant(req, res, next){
        try {
            const {PlantId} = req.body
            if(!PlantId){
                throw {name: "EmptyField"}
            }
            if(!req.file){
                throw {name: "EmptyImage"}
            }
            const {id} = req.user
            const {location} = req.file
            await MyPlant.create({PlantId, UserId: id, imgUrl: location})
            res.status(201).json({message: "Your plant added successfully"})
        } catch (error) {
            next(error)
        }
    }
                    
    static async getSingleMyPlant(req, res, next){
        try {
            const {id} = req.params
            const {id: UserId} = req.user

            const myPlant = await MyPlant.findByPk(id, {include: Plant}, {where: {UserId: UserId}})

            if(!myPlant){
                throw {name: "NotFound"}
            }

            res.status(200).json(myPlant)
        } catch (error) {
            next(error)
        }
    }

    static async checkDisease(req, res, next) {
        try {
            const { id: UserId } = req.user
            const { id } = req.params
            uploadSingle(req, res, (error) => {
                if(error) return res.status(400).json({ message: `Only images are allowed!` })
                predict(req.file.path)
                .then((prediction) => {
                    const { confidence, disease } = prediction
                    MyPlant.update({ confidence, disease }, { where: { UserId, id } })
                    .then(() => {
                        res.json(prediction)
                    })
                    .catch((error) => {
                        throw error
                    })
                })
                .catch((error) => {
                    throw error
                })
            })
        } catch (error) {
            next(error)  
        }
    }

    static async getReward(req, res, next){
        try {
            const reward = await Reward.findAll()
            res.status(200).json(reward)
        } catch (error) {
            next(error)
        }
    }

    static async rewardById(req, res, next){
        try {
            const {id} = req.params
            const reward = await Reward.findByPk(id)
            res.status(200).json(reward)
        } catch (error) {
            next(error)
        }
    }

    static async getMyReward(req, res, next){
        try {
            const {id} = req.user

            const myReward = await MyReward.findAll({where: {UserId: id}})

            res.status(200).json(myReward)
        } catch (error) {
            next(error)
        }
    }

    static async claimReward(req, res, next){
        try {
            const {rewardId} = req.params
            const {id} = req.user

            const user = await User.findByPk(id)
            const reward = await Reward.findByPk(rewardId)
            if(!reward) throw { name: `NotFound` }

            if(user.point >= reward.point){
                let point = user.point - reward.point
                await User.update({ point }, {where: { id: id }})
                await MyReward.create({UserId: id, RewardId: rewardId})
            } else {
                throw {name: "Insufficient"}
            }
            res.status(200).json({message: "Success"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController