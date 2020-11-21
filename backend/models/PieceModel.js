import mongoose from "mongoose";

const pieceSchema = new mongoose.Schema({
  type: { type: String, default: "", required: true },
  coordinates: {
    x: { type: Number, default: 0, required: true },
    y: { type: Number, default: 0, required: true },
    z: { type: Number, default: 0, required: true },
  },
  obj: { type: String, default: "", required: true },
});

const Piece = mongoose.model("Piece", pieceSchema);
export default Piece;
