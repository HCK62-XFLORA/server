const { createServer } = require("http");
const { Server } = require("socket.io");
const configureSocket = require("../config_socket/socket");

describe("Socket.io Server Testing", () => {
  let io;
  let server;
  let socketClient;

  beforeAll(() => {
    server = createServer();
    io = configureSocket(new Server(server));
    server.listen(3000); // Port sesuaikan dengan konfigurasi Anda
  });

  afterAll(() => {
    io.close();
    server.close();
  });

  beforeEach((done) => {
    // Mengkoneksikan client socket.io ke server
    socketClient = require("socket.io-client")("http://localhost:3000");
    socketClient.on("connect", done);
  });

  afterEach((done) => {
    // Memutus koneksi setelah setiap uji
    if (socketClient.connected) {
      socketClient.disconnect();
    }
    done();
  });

  it("should join and leave room", (done) => {
    const roomId = "testRoom";
    socketClient.emit("joinRoom", { ThreadId: roomId });

    // Menunggu server mengirimkan pesan konfirmasi
    socketClient.on("serverMessage", (message) => {
      expect(message).toBe(`Joined room: ${roomId}`);

      // Memutus koneksi dari ruangan
      socketClient.emit("leaveRoom", { ThreadId: roomId });

      // Menunggu server mengirimkan pesan konfirmasi
      socketClient.on("serverMessage", (leaveMessage) => {
        expect(leaveMessage).toBe(`Left room: ${roomId}`);
        done();
      });
    });
  });

  it("should send and receive client messages", (done) => {
    const roomId = "testRoom";
    const message = "Hello, Server!";
    socketClient.emit("joinRoom", { ThreadId: roomId });

    // Menunggu server mengirimkan pesan konfirmasi
    socketClient.on("serverMessage", (joinMessage) => {
      expect(joinMessage).toBe(`Joined room: ${roomId}`);

      // Mengirim pesan dari client
      socketClient.emit("clientMessage", {
        ThreadId: roomId,
        comment: message,
        UserId: 1,
      });

      // Menunggu server mengirimkan pesan balasan
      socketClient.on("serverMessage", (serverMessage) => {
        expect(serverMessage).toBe(`Received message: ${message}`);
        done();
      });
    });
  });
});
