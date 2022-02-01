const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const path = require("path");

const publicPath = path.join(__dirname, "../client/build");

app.use(cors());
app.use(express.static(publicPath));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // socket.on("join_room", (data) => {
  //   socket.join(data);
  //   console.log(`User with ID: ${socket.id} joined room: ${data}`);
  // });

  // socket.on("send_message", (data) => {
  //   socket.to(data.room).emit("receive_message", data);
  // });

  socket.on("play", (playMsg) => {
    io.emit("play", playMsg);
  });

  socket.on("stop", (stopMsg) => {
    io.emit("stop");
  });

  socket.on("arm", (armMsg) => {
    io.emit("arm", armMsg);
  });

  socket.on("switch", (switchMsm) => {
    io.emit("switch", switchMsm);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use("*", (req, res) => {
  res.sendFile(path.resolve( `${publicPath}/index.html`));
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});
