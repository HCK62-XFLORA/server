class ThreadController {

    static async getThreads(req, res, next) {
        try {
            const { nthThreads, title } = req.query
            const limit = 5
            let option = { limit, offset: nthThreads * limit }

            if(title) option.where = { title }

            const threads = await Thread.findAll(option)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ThreadController