const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://192.168.31.111:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} has connected`);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("elements", (data) => {
    // 广播到同一个房间的其他用户
    socket.to(data.roomId).emit("servedElements", data.elements);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} has disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
