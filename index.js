var express = require("express");
var socket = require("socket.io");
var serveIndex = require("serve-index");

var app = express();
var port_client = 9080;
var port_server = 9090;

// 静的ホスティング
// app
//   .use(express.static("..public"))
//   .use(serveIndex("../public", { icons: true }))
//   .listen(process.env.PORT || port_client);

app
  .use(express.static(__dirname + "/dist"))
  .listen(process.env.PORT || port_client);

// WebSocket
const server = app.listen(port_server, function() {
  console.log("server running on port 9090");
});
const io = socket(server);

io.on("connection", (socket) => {
  socket.on("ENTER-ROOM", function(data) {
    socket.join(data.roomName);
    socket.to(data.roomName).broadcast.emit("USER-ENTERED", data);
    socket.on("disconnect", () => {});

    socket.on("CHAT-MESSAGE", (data) => {
      socket.to(data.roomName).broadcast.emit("CHAT-MESSAGE", data);
    });
  });
});
