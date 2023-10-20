class ThreadController {

    static async getThreads(req, res, next) {
        try {
            const { nthThreads } = req.query
            let option = { limit: 5, offset: nthThreads }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ThreadController