/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { clearInterval } from "timers";
import userRouter from "./routers/userRouter";
import config from "./config";
import { type } from "os";

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
    transports: ["websocket"],
  },
});

class Game {
  constructor(user1, user2, timeVariant = 300) {
    this.user1 = { name: user1, timeRemaining: timeVariant };
    this.user2 = { name: user2, timeRemaining: timeVariant };
    this.interval = null;
  }
}
const activeUsers = {};
const activeSockets = {};
const queue = [];
const games = {};
let user1;
let user2;
io.on("connection", (socket) => {
  socket.on("new user joined", (data) => {
    const username = data.user.name;
    if (!activeSockets.hasOwnProperty(socket.id)) {
      activeSockets[socket.id] = { socket, user: username };
    }
    if (!activeUsers.hasOwnProperty(username)) {
      activeUsers[username] = {
        sockets: [socket.id],
      };
      console.log(data.user.name, "connected");
    } else {
      activeUsers[username].sockets.push(socket.id);
      console.log(data.user.name, "started app at a new tab");
      if (data.room) {
        socket.join(data.room);
      }
    }
  });
  socket.on("search game", (username) => {
    queue.push(username);
    if (queue.length >= 2) {
      user1 = queue.shift();
      user2 = queue.shift();
      if (activeUsers.hasOwnProperty(user1)) {
        activeUsers[user1].sockets.forEach(async (socketId) => {
          activeSockets[socketId].socket.join(`${user1}-${user2}`);
          activeSockets[socketId].socket.emit("game started", {
            room: `${user1}-${user2}`,
            color: 1,
            opponent: user2,
          });
          console.log(socketId);
        });
      }
      if (activeUsers.hasOwnProperty(user2)) {
        activeUsers[user2].sockets.forEach(async (socketId) => {
          activeSockets[socketId].socket.join(`${user1}-${user2}`);
          activeSockets[socketId].socket.emit("game started", {
            room: `${user1}-${user2}`,
            color: -1,
            opponent: user1,
          });
          console.log(socketId);
        });
      }
      console.log("joined room", `${user1}-${user2}`);
      games[`${user1}-${user2}`] = new Game(user1, user2);
    } else {
      socket.emit("waiting for opponent");
    }
  });
  socket.on("sendMove", (data) => {
    if (data.turn === 1) {
      clearInterval(games[data.room].interval);
      games[data.room].interval = setInterval(() => {
        if (games[data.room].user2.timeRemaining <= 0) {
          io.to(data.room).emit("timeout", "time out white won!");
        }
        games[data.room].user2.timeRemaining -= 1;
        io.to(data.room).emit("timeupdate", {
          white: games[data.room].user1.timeRemaining,
          black: games[data.room].user2.timeRemaining,
        });
      }, 1000);
    } else {
      clearInterval(games[data.room].interval);
      games[data.room].interval = setInterval(() => {
        if (games[data.room].user1.timeRemaining <= 0) {
          io.to(data.room).emit("timeout", "time out black won!");
        }
        games[data.room].user1.timeRemaining -= 1;
        io.to(data.room).emit("timeupdate", {
          white: games[data.room].user1.timeRemaining,
          black: games[data.room].user2.timeRemaining,
        });
      }, 1000);
    }
    socket.to(data.room).emit("getMove", data);
  });
  socket.on("checkmate", (data) => {
    io.to(data.room).emit("checkmate", data);
  });
  socket.on("resign", (data) => {
    io.to(data.room).emit("resign", data);
  });
  socket.on("finish", (data) => {
    if(games.hasOwnProperty(data.room)){
      clearInterval(games[data.room].interval)
      delete games[data.room];
    }
    console.log(games)
    socket.leave(data.room);
  });
  // Whenever someone disconnects this piece of code executed
  socket.on("disconnect", () => {
    try {
      const socketId = socket.id;
      console.log("geldim");
      const username = activeSockets[socketId].user;
      const userSocketList = activeUsers[username].sockets;
      userSocketList.splice(userSocketList.indexOf(socketId), 1);
      delete activeSockets[socketId];
      console.log(username, "closed a tab");
      if (userSocketList.length === 0) {
        console.log("evet");
        setTimeout(() => {
          if (
            userSocketList.length === 0 &&
            activeUsers.hasOwnProperty(username)
          ) {
            delete activeUsers[username];
            console.log(`${username}disconnected`);
          }
        }, 15000);
      }
    } catch (error) {
      console.log("unexpected disconnection why do you leave us + bişey oldu");
    }
  });
});

http.listen(5000, () => {
  console.log("listening on:5000");
});
