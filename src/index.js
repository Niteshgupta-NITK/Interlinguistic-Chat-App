const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const Filter = require("bad-words");
const { generateMessage } = require("./utils/msgs");
const {
  getUser,
  getUserInRoom,
  addUser,
  removeUser,
} = require("./utils/users");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("New Web Socket connection");

  socket.on("join", ({username,room}, callback) => {
    const { error, user } = addUser({ id: socket.id, username,room });
    if (error) {
      return callback(error);
    }
    socket.join(user.room);
    socket.emit("message", generateMessage("Welcome!",'Admin'));
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage(`${user.username} has joined!`,'Admin'));

      io.to(user.room).emit('roomData',{
        room:user.room,
        users:getUserInRoom(user.room)
      });
    callback();
  });

  socket.on("SendMessage", (msg, callback) => {
    const user=getUser(socket.id);
    const filter = new Filter();
    
    
    if (filter.isProfane(msg)) {
      return callback(
        "Your message is violation against our community Guidelines"
      );
    }
    io.to(user.room).emit("message", generateMessage(msg,user.username));
    callback();
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage(`${user.username} has left !`,'Admin')
      );
      io.to(user.room).emit('roomData',{
        room:user.room,
        users:getUserInRoom(user.room)
      });
    }
  });
  socket.on("sendLocation", (coords, callback) => {
    const user=getUser(socket.id);
    io.to(user.room).emit(
      "locationmessage",
      generateMessage(
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,user.username
      )
    );
    callback();
  });
});

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));
server.listen(port, () => {
  console.log("server is running up on " + port);
});
