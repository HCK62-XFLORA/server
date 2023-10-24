if(process.env.NODE_ENV !== `production`) require(`dotenv`).config()

const express = require(`express`)
const app = express()
const PORT = process.env.PORT || 3000

const cors = require(`cors`)
const router = require(`./routes/index`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(`/`, router)



// app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
module.exports = {
    PORT,
    app
}