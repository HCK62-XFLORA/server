if(process.env.NODE_ENV !== `production`) require(`dotenv`).config()

const express = require(`express`)
const app = express()
const PORT = process.env.PORT || 3000

const cors = require(`cors`)
const router = require(`./routes/index`)

const server = require(`http`).createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(`/`, router)

app.get(`/`, (req, res) => res.send(`Hi there!`))



// app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
module.exports = {
    server,
    PORT,
    app
}