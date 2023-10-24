const { Server } = require("socket.io");
const CommentController = require("../controllers/commentController");

function configureSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["POST"],
    },
  });

  io.on("connection", (socket) => {
    // console.log("A client connected");

    // Handler untuk event join room
    socket.on("joinRoom", (params) => {
      const { ThreadId } = params;
      socket.join(ThreadId);
      // console.log(params, "<<<<");
      // console.log(`Socket ${socket.id} joined room: ${ThreadId}`);
    });

    // Handler untuk event leave room
    socket.on("leaveRoom", (params) => {
      const { ThreadId } = params;
      socket.leave(ThreadId);
      console.log(`Socket ${socket.id} left room: ${ThreadId}`);
    });

    socket.on("clientMessage", (message) => {
      // console.log("clientMessage", message);

      const { ThreadId, comment, UserId } = message;
      
      // io.emit("serverMessage", { ThreadId, comment, UserId });
      // io.to(ThreadId).emit("serverMessage", { ThreadId, comment, UserId });

      CommentController.postComment(ThreadId, comment, UserId)
        .then((newComment) => {
          // Handle response jika diperlukan
          console.log(newComment, "<ini dari axios", newComment) ;
          // console.log(typeof newComment, "<ini tipe data");
          console.log(newComment.ThreadId, "<<<<<");
          // Kirim pesan ke semua klien dalam room kecuali pengirim
          io.to(newComment.ThreadId).emit("serverMessage", newComment);
          /**
           * {
           *  id: 1,
           *   threadoDD: 1,
           * content: "asdasdasd",
           * siapaPembuat: "asdasd"
           * }
           */
          // socket.broadcast.emit("serverMessage", newComment.comment);
        })
        .catch((error) => {
          // Handle error jika diperlukan
          console.log(error, "<<<");
        });
    });

    // socket.on("disconnect", () => {
    //   console.log("A client disconnected");
    // });
  });

  return io;
}

module.exports = configureSocket;
