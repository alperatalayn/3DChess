import mongoose from "mongoose";

const pieceSchema = new mongoose.Schema({
  pieceRef: {
    type: mongoose.Schema.Types,
    ref: "Piece",
    required: true,
    name: "Pawn",
  },
});

const Piece = mongoose.model("Piece", pieceSchema);
export default Piece;
