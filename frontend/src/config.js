export const apiUrl = "http://localhost:5000";
class Piece {
  constructor(type, { x, y, z }, obj, color) {
    this.obj = obj;
    this.coordinates = { x, y, z };
    this.type = type;
    this.color = color;
  }
}
export const initialState = {
  p1: new Piece("WhitePawn", { x: 0, y: 1, z: 0 }, "ChessPawn.obj", "White"),
  p2: new Piece("WhitePawn", { x: 1, y: 1, z: 0 }, "ChessPawn.obj", "White"),
  p3: new Piece("WhitePawn", { x: 2, y: 1, z: 0 }, "ChessPawn.obj", "White"),
  p4: new Piece("WhitePawn", { x: 3, y: 1, z: 0 }, "ChessPawn.obj", "White"),
  p5: new Piece("WhitePawn", { x: 4, y: 1, z: 0 }, "ChessPawn.obj", "White"),
  p6: new Piece("WhitePawn", { x: 0, y: 1, z: 1 }, "ChessPawn.obj", "White"),
  p7: new Piece("WhitePawn", { x: 1, y: 1, z: 1 }, "ChessPawn.obj", "White"),
  p8: new Piece("WhitePawn", { x: 2, y: 1, z: 1 }, "ChessPawn.obj", "White"),
  p9: new Piece("WhitePawn", { x: 3, y: 1, z: 1 }, "ChessPawn.obj", "White"),
  p10: new Piece("WhitePawn", { x: 4, y: 1, z: 1 }, "ChessPawn.obj", "White"),
  wr1: new Piece("Rook", { x: 0, y: 0, z: 0 }, "ChessRook.obj", "White"),
  wn1: new Piece("Knight", { x: 1, y: 0, z: 0 }, "ChessKnight.obj", "White"),
  wk: new Piece("King", { x: 2, y: 0, z: 0 }, "ChessKing.obj", "White"),
  wn2: new Piece("Knight", { x: 3, y: 0, z: 0 }, "ChessKnight.obj", "White"),
  wr2: new Piece("Rook", { x: 4, y: 0, z: 0 }, "ChessRook.obj", "White"),
  wb1: new Piece("Bishop", { x: 0, y: 0, z: 1 }, "ChessBishop.obj", "White"),
  wu1: new Piece("Unicorn", { x: 1, y: 0, z: 1 }, "ChessUnicorn.obj", "White"),
  wq: new Piece("Queen", { x: 2, y: 0, z: 1 }, "ChessQueen.obj", "White"),
  wb2: new Piece("Bishop", { x: 3, y: 0, z: 1 }, "ChessBishop.obj", "White"),
  wu2: new Piece("Unicorn", { x: 4, y: 0, z: 1 }, "ChessUnicorn.obj", "White"),

  bp1: new Piece("BlackPawn", { x: 0, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  bp2: new Piece("BlackPawn", { x: 1, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  bp3: new Piece("BlackPawn", { x: 2, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  bp4: new Piece("BlackPawn", { x: 3, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  bp5: new Piece("BlackPawn", { x: 4, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  bp6: new Piece("BlackPawn", { x: 0, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  bp7: new Piece("BlackPawn", { x: 1, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  bp8: new Piece("BlackPawn", { x: 2, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  bp9: new Piece("BlackPawn", { x: 3, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  bp10: new Piece("BlackPawn", { x: 4, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  br1: new Piece("Rook", { x: 0, y: 4, z: 4 }, "ChessRook.obj", "Black"),
  bn1: new Piece("Knight", { x: 1, y: 4, z: 4 }, "ChessKnight.obj", "Black"),
  bk: new Piece("King", { x: 2, y: 4, z: 4 }, "ChessKing.obj", "Black"),
  bn2: new Piece("Knight", { x: 3, y: 4, z: 4 }, "ChessKnight.obj", "Black"),
  br2: new Piece("Rook", { x: 4, y: 4, z: 4 }, "ChessRook.obj", "Black"),
  bb1: new Piece("Bishop", { x: 1, y: 4, z: 3 }, "ChessBishop.obj", "Black"),
  bu1: new Piece("Unicorn", { x: 0, y: 4, z: 3 }, "ChessUnicorn.obj", "Black"),
  bq: new Piece("Queen", { x: 2, y: 4, z: 3 }, "ChessQueen.obj", "Black"),
  bb2: new Piece("Bishop", { x: 4, y: 4, z: 3 }, "ChessBishop.obj", "Black"),
  bu2: new Piece("Unicorn", { x: 3, y: 4, z: 3 }, "ChessUnicorn.obj", "Black"),
};
