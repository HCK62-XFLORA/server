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

const { Comment } = require("./models");
// Endpoint untuk menambahkan komentar ke thread dengan threadId yang sesuai
app.post("/comments", async (req, res) => {
  try {
    const { comment } = req.body;
    const ThreadId = 1; // Ganti dengan nilai ThreadId yang diinginkan
    const UserId = 1; // Ganti dengan nilai UserId yang diinginkan
    const isUseFul = true; // Ganti dengan nilai isUseFul yang diinginkan
    if (!comment) {
      return res.status(400).json({ error: "Comment is required." });
    }

    // Simpan komentar ke basis data menggunakan model Comment
    const createComment = await Comment.create({
      comment,
      ThreadId,
      UserId,
      isUseFul,
    });

    // Siarkan komentar baru ke semua klien yang terhubung
    // io.emit("serverMessage", createComment);
    // socket.broadcast.emit("serverMessage", createComment);

    res.json({
      status: "success",
      message: "Comment added successfully.",
      createComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// io.on("connection", (socket) => {
//   // console.log("A client connected");

//   //   const { threadId } = socket.handshake.query;

//   // // Bergabung ke ruang dengan nama threadId
//   // socket.join(threadId);

//   // console.log(`User connected to thread: ${threadId}`);

//   // Handle 'create-something' event from client
//   socket.on("create-something", (data) => {
//     console.log("Received create-something event with data:", data);
//     io.emit("create-something", data);
//     // Handle the data here and send a response back to the client if needed
//   });

//   // socket.on("clientMessage", (message) => {
//   //   console.log("clientMessage", message);
//   //   // io.emit('serverMessage', message);
//   //   socket.broadcast.emit("serverMessage", message);
//   // });

//   // Handle 'clientMessage' event from client
//   socket.on("clientMessage", (message) => {
//     console.log("clientMessage", message);
//     // Siarkan pesan klien ke semua klien kecuali pengirimnya
//     socket.broadcast.emit("serverMessage", message);
//   });

//   // Menyimpan objek io dalam request untuk digunakan di router
//   app.use((req, res, next) => {
//     req.io = io;
//     console.log(req.io, "<< ini req.io");
//     next();
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("A client disconnected");
//   });
// });

server.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
