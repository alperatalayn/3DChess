import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
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
app.use((err, req, res) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});
app.listen(5000, () => {
  console.log("serve at http://localhost:5000 ");
});
