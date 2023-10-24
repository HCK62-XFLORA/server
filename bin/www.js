const { app, server, io } = require('../app');

const PORT = process.env.PORT || 3000; // Port dapat diubah di sini

server.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
