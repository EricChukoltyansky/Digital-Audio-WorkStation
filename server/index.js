const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const app = express();
const { Server } = require("socket.io");
// require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "../client/build");
app.use(express.static(publicPath));

const server = http.createServer(app);
console.log(server)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("arm", (armMsg) => {
    io.emit("arm", armMsg);
  });

  socket.on("switch", (switchMsm) => {
    io.emit("switch", switchMsm);
  });

  socket.on("rewind", (rewindMessage) => {
    io.emit("rewind", rewindMessage);
  });

  socket.on("clearAll", (clearAllMsg) => {
    io.emit("clearAll", clearAllMsg);
  });

  socket.on("BPM", (BPMmessage) => {
    io.emit("BPM", BPMmessage);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});

console.log(PORT)

const PORT = process.env.PORT || 3001;

console.log("Server is running on port", PORT);

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
