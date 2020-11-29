/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter";
import config from "./config";

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((error) => {
    console.log(error.reason);
  });
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRouter);
app.use((err, req, res) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

// Whenever someone connects this gets executed
const activeUsers = {};
const activeSockets = {};
const queue = [];
const rooms = {};
let user1;
let user2;
io.on("connection", (socket) => {
  socket.on("userconnected", (data) => {
    const userDetails = data.user;
    const username = data.user.name;
    if (!activeSockets.hasOwnProperty(socket.id)) {
      activeSockets[socket.id] = { socket, username };
    }
    if (!activeUsers.hasOwnProperty(username)) {
      activeUsers[username] = {
        userDetails,
        sockets: [socket.id],
      };
      console.log(data.user.name, "connected");
      queue.push(username);
    } else {
      activeUsers[username].sockets.push(socket);
      console.log(data.user.name, "started app at a new tab");
      if (data.room) {
        console.log(data.room);
        socket.join(data.room);
      }
    }
    if (queue.length >= 2) {
      user1 = queue.shift();
      user2 = queue.shift();
      if (activeUsers.hasOwnProperty(user1)) {
        activeUsers[user1].sockets.forEach((socketId) => {
          activeSockets[socketId].socket.join(user1);
          activeSockets[socketId].socket.emit("game started", {
            room: user1,
            color: "White",
          });
          console.log(socketId);
        });
      }
      if (activeUsers.hasOwnProperty(user2)) {
        activeUsers[user2].sockets.forEach((socketId) => {
          activeSockets[socketId].socket.join(user1);
          activeSockets[socketId].socket.emit("game started", {
            room: user1,
            color: "Black",
          });
          console.log(socketId);
        });
      }
      console.log("joined room", user1);
      rooms[user1] = user2;
    }
  });
  socket.on("sendMove", async (data) => {
    io.to(data.room).emit("getMove", data);
    console.log(data);
  });
  socket.on("checkmate", async (data) => {
    io.to(data.room).emit("game ended", data);
    console.log(data);
  });

  // Whenever someone disconnects this piece of code executed
  socket.on("disconnect", () => {
    const socketId = socket.id;
    const { username } = activeSockets[socketId];
    let userSocketList = activeUsers[username].sockets;
    userSocketList.splice(userSocketList.indexOf(socketId), 1);
    delete activeSockets[socketId];
    console.log(username, "closed a tab");
    if (userSocketList.length === 0) {
      setTimeout(() => {
        userSocketList = activeUsers[username].sockets;
        if (userSocketList.length === 0) {
          if (rooms.hasOwnProperty(username)) {
            io.to(username).emit("game ended", "Opponent disconnected");
            delete rooms[username];
          }

          if (Object.values(rooms).indexOf(username) > -1) {
            io.to(
              Object.keys(rooms).find((key) => rooms[key] === username)
            ).emit("game ended", "Opponent disconnected");
            delete rooms[
              Object.keys(rooms).find((key) => rooms[key] === username)
            ];
          }
          delete activeUsers[username];
          console.log(`${username}disconnected`);
        }
      }, 15000);
    }
  });
});

http.listen(5000, () => {
  console.log("listening on:5000");
});
