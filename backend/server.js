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
io.on("connection", (socket) => {
  socket.on("userconnected", (data) => {
    const userDetails = data;
    const username = data.name;
    socket.user = username;
    if (!activeSockets.hasOwnProperty(socket.id)) {
      activeSockets[socket.id] = socket;
    }
    if (!activeUsers.hasOwnProperty(username)) {
      activeUsers[username] = {
        userDetails,
        sockets: [socket.id],
      };
      console.log(data.name, "connected");
    } else {
      activeUsers[username].sockets.push(socket);
      console.log(data.name, "started app at a new tab");
    }
  });
  socket.on("sendMove", async (data) => {
    io.emit("getMove", data);
    console.log(data);
  });

  // Whenever someone disconnects this piece of code executed
  socket.on("disconnect", () => {
    const socketId = socket.id;
    const username = activeSockets[socketId].user;
    const userSocketList = activeUsers[username].sockets;
    userSocketList.splice(userSocketList.indexOf(socketId), 1);
    delete activeSockets[socketId];
    console.log(username, "closed a tab");
    if (userSocketList.length === 0) {
      // That means no socket for that user is active and user is now offline
      console.log(username, "disconnected");
      delete activeUsers[username];
    }
  });
});

http.listen(5000, () => {
  console.log("listening on *:3000");
});
