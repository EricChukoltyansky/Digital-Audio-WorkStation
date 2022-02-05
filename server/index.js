const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const path = require("path");
const app = express();

const publicPath = path.join(__dirname, "../client/build");
app.use(cors());
app.use(express.static(publicPath));

// const {addUser, removeUser, getUser, getUsersInRoom} = require('./controllers/controllers')

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // socket.on("join", ({ name, room }, callback) => {
  //   const { error, user } = addUser({ id: socket.id, name, room });

  //   if (error) return callback(error);

  //   // Emit will send message to the user
  //   // who had joined
  //   socket.emit("message", {
  //     user: "admin",
  //     text: `${user.name},
  //         welcome to room ${user.room}.`,
  //   });

  //   // Broadcast will send message to everyone
  //   // in the room except the joined user
  //   socket.broadcast
  //     .to(user.room)
  //     .emit("message", { user: "admin", text: `${user.name}, has joined` });

  //   socket.join(user.room);

  //   io.to(user.room).emit("roomData", {
  //     room: user.room,
  //     users: getUsersInRoom(user.room),
  //   });
  //   callback();
  // });

  // socket.on("sendMessage", (message, callback) => {
  //   const user = getUser(socket.id);
  //   io.to(user.room).emit("message", { user: user.name, text: message });

  //   io.to(user.room).emit("roomData", {
  //     room: user.room,
  //     users: getUsersInRoom(user.room),
  //   });
  //   callback();
  // });

  socket.on("arm", (armMsg) => {
    io.emit("arm", armMsg);
  });

  socket.on("switch", (switchMsm) => {
    io.emit("switch", switchMsm);
  });

    socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });

  // socket.on("disconnect", () => {
  //   console.log(socket.id);
  //   const user = removeUser(socket.id);
  //   if (user) {
  //     io.to(user.room).emit("message", {
  //       user: "admin",
  //       text: `${user.name} had left`,
  //     });
  //     // socket.leave(socket.room)
  //   }
  // });
});

app.use("*", (req, res) => {
  res.sendFile(path.resolve(`${publicPath}/index.html`));
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});
