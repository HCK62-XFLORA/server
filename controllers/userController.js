const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { uploadSingle } = require('../helpers/tensorflow')
const {User, MyPlant, Plant, Reward, MyReward} = require('../models/index')

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
            console.log(req.body);

            const user = await User.create({email, password, username, birthday, gender})

            res.status(201).json({id: user.id, email: email})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    // static async forgetPassword(req, res, next){
    //     try {
    //         const {email} = req.body

    //         if(!email){
    //             throw {name: "EmptyEmail"}
    //         }

    //         const user = await User.findOne({where: {email: email}})

    //         if(!user){
    //             throw "NotFound"
    //         }

    //         const token = generateToken({id: user.id})


    //     } catch (error) {
            
    //     }
    // }

    // static async resetPassword(req, res, next){
    //     try {
    //         const {password} = req.body
    //         await User.update({password: password}, {where: {}})
    //         res.status(200).json({message: "Reset password success"})
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    static async getUser(req, res, next){
        try {
            const {id} = req.params
            const user = await User.findByPk(id, {include: {model: MyPlant}, where: {UserId: id}, attributes : { exclude: ['password']}})

            if(!user){
                throw {name: "NotFound"}
            }

            res.status(200).json(user)
        } catch (error) {
            console.log(error);
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

    static async getMyPlant(req, res, next){
        try {
            const {id} = req.user
            const myPlant = await MyPlant.findAll({where: {UserId: id}})

            res.status(200).json(myPlant)
        } catch (error) {
            
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
            const {id} = req.user
            const {location} = req.file

            await MyPlant.create({PlantId, UserId: id, imgUrl: location})
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

    static async checkDisease(req, res, next) {
        try {
            uploadSingle(req, res, (error) => {
                if(error) return res.status(400).json({ message: `Only images are allowed!` })

                predict(req.file.path)
                .then((prediction) => {
                    res.json(prediction)
                })
                .catch((error) => {
                    throw error
                })
            })
        } catch (error) {
          next(error)  
        }
    }

    static async getPoints(req, res, next) {
        try {
            // const { id } = req.user

            const threads = await Thread.findAll({ include: [`Comments`, `Reactions`], where: { UserId: 2 } })
            // console.log(threads)
            const likes = threads.map((thread) => {
                if(thread.Reactions.reaction) {
                    return thread.Reaction
                }
            })
            const dislikes = threads.map((thread) => {
                if(!thread.Reactions.reaction) {
                    return thread.Reaction
                }
            })

            const threadCount = threads.length
            // const comments = threads.map((thread) => {
            //     return threads.Comments
            // })
            res.json({ likes, dislikes, comments })
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

    static async claimReward(req, res, next){
        try {
            const {rewardId} = req.params
            const {id} = req.user

            const user = await User.findByPk(id)
            const reward = await Reward.findByPk(rewardId)

            if(user.point >= reward.point){
                point = user.point - reward.point
                await User.update(point, {where: {id: id}})
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