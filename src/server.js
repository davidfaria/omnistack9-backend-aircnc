const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const routes = require("./routes");

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(
  "mongodb+srv://<USER>:<PASSWORD>@omnistack-orwal.mongodb.net/<YOUR-COLLECTION-DB>?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// io.on("connection", socket => {
//   console.log("Usuário conectado", socket.id);
//   setTimeout(() => {
//     socket.emit("hello", "Word");
//   }, 5000);
// });

// PODE USAR O REDIS PARA ARMAZENAR OS USER CONECTADOS
const connectedUsers = {};

io.on("connection", socket => {
  // console.log(socket.handshake.query);
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(3333);
