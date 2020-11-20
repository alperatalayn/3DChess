<<<<<<< HEAD
import mongoose from "mongoose";

const pieceSchema = new mongoose.Schema({
  name: { type: String, default: "", required: true },
  coordinates: {
    x: { type: Number, default: 0, required: true },
    y: { type: Number, default: 0, required: true },
    z: { type: Number, default: 0, required: true },
  },
});

const Piece = mongoose.model("Piece", pieceSchema);
export default Piece;