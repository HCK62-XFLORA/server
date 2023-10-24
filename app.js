if (process.env.NODE_ENV !== `production`) require(`dotenv`).config();

const configureSocket = require("./config_socket/socket");

const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const io = configureSocket(server)

const PORT = process.env.PORT || 3000;

const cors = require(`cors`);
const router = require(`./routes/index`);

// app.set("io", io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(`/`, router);

app.get(`/`, (req, res) => res.send(`Hi there!`));

server.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
