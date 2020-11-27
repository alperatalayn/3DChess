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
let clients = 0;
io.on("connection", (socket) => {
  clients += 1;
  socket.join("room1");
  // Send this event to everyone in the room.
  socket.on("sendMove", async (data) => {
    io.to("room1").emit("getMove", data);
    console.log(data);
  });
  socket.on("userconnected", (data) => {
    console.log(
      data.name || "user not found",
      "connected total online:",
      clients
    );
  });

  // Whenever someone disconnects this piece of code executed
  socket.on("disconnect", () => {
    clients -= 1;
    console.log("A user disconnected");
  });
});

http.listen(5000, () => {
  console.log("listening on *:3000");
});
