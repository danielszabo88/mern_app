const express = require("express");
require("dotenv").config();
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

const fruitsRouter = require("./routes/fruits");
const usersRouter = require("./routes/users");
const path = require("path");

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to DB!"));

app.use(express.json());

app.use("/api/fruits", fruitsRouter);
app.use("/api/users", usersRouter);

let users = {}
io.on('connection', socket => {
  console.log("Hello from the Server! Socket ID: "+socket.id)

  socket.on("userJoin", username => {
    users[socket.id] = username
    socket.join(username)
    socket.join("General Chat")
    console.log("User Object after connection: ", users)
    io.emit("userList", [...new Set(Object.values(users))])
  })

  socket.on("newMessage", newMessage => {
    io.to(newMessage.room).emit("newMessage", { name: newMessage.name, msg: newMessage.msg, isPrivate: newMessage.isPrivate})
  })

  socket.on("roomEntered", ({oldRoom, newRoom}) => {
    socket.leave(oldRoom)
    io.to(oldRoom).emit("newMessage", {name: "NEWS", msg: `${users[socket.id]} just left "${oldRoom}"`})
    io.to(newRoom).emit("newMessage", {name: "NEWS", msg: `${users[socket.id]} just joined "${newRoom}"`})
    socket.join(newRoom)
  })

  socket.on("disconnect", () => {
    //io.emit("newMessage", {name: "NEWS", msg: `${users[socket.id]} totally left the chat`})
    delete users[socket.id]
    io.emit("userList", [...new Set(Object.values(users))])
    console.log("Users after disconnection: ", users)
  })
})

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
