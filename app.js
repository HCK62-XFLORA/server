if (process.env.NODE_ENV !== `production`) require(`dotenv`).config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000

const http = require("http");
const server = http.createServer(app);

const configureSocket = require("./config_socket/socket");
const io = configureSocket(server)

const cors = require(`cors`);
const router = require(`./routes/index`);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/`, router);

// app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))

module.exports = {
    app,
    server,
    io, 
    PORT
};
