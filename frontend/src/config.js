export const apiUrl = "http://localhost:5000";
const BOARD_SIZE = 5;
export const FILE = { e: 0, d: 1, c: 2, b: 3, a: 4 };
export const RANK = { one: 0, two: 1, three: 2, four: 3, five: 4 };
export const LEVEL = { A: 0, B: 1, C: 2, D: 3, E: 4 };
export const pieces = Object.freeze({
  EMPTY: 0,
  WP: 1,
  WN: 2,
  WB: 3,
  WR: 4,
  WU: 5,
  WQ: 6,
  WK: 7,
  BP: -1,
  BN: -2,
  BB: -3,
  BR: -4,
  BU: -5,
  BQ: -6,
  BK: -7,
});
export const squareToIndex = (file, rank, level) => {
  return level * BOARD_SIZE * BOARD_SIZE + rank * BOARD_SIZE + file;
};
export const indexToSquare = (index) => {
  let Level = index / (BOARD_SIZE * BOARD_SIZE);
  Level = Math.floor(Level);
  let Rank = (index - Level * BOARD_SIZE * BOARD_SIZE) / BOARD_SIZE;
  Rank = Math.floor(Rank);
  let File = index - Level * BOARD_SIZE * BOARD_SIZE - Rank * BOARD_SIZE;
  File = Math.floor(File);
  return {
    file: File,
    rank: Rank,
    level: Level,
  };
};
export const startingPosBoard = () => {
  const board = new Int8Array(125);
  for (let i = FILE.e; i <= FILE.a; i += 1) {
    board[squareToIndex(i, RANK.two, LEVEL.A)] = pieces.WP;
    board[squareToIndex(i, RANK.two, LEVEL.B)] = pieces.WP;
  }
  for (let i = FILE.e; i <= FILE.a; i += 1) {
    board[squareToIndex(i, RANK.four, LEVEL.E)] = pieces.BP;
    board[squareToIndex(i, RANK.four, LEVEL.D)] = pieces.BP;
  }

  board[squareToIndex(FILE.a, RANK.one, LEVEL.B)] = pieces.WB;
  board[squareToIndex(FILE.d, RANK.one, LEVEL.B)] = pieces.WB;

  board[squareToIndex(FILE.b, RANK.one, LEVEL.B)] = pieces.WU;
  board[squareToIndex(FILE.e, RANK.one, LEVEL.B)] = pieces.WU;

  board[squareToIndex(FILE.a, RANK.one, LEVEL.A)] = pieces.WR;
  board[squareToIndex(FILE.e, RANK.one, LEVEL.A)] = pieces.WR;

  board[squareToIndex(FILE.b, RANK.one, LEVEL.A)] = pieces.WN;
  board[squareToIndex(FILE.d, RANK.one, LEVEL.A)] = pieces.WN;

  board[squareToIndex(FILE.c, RANK.one, LEVEL.A)] = pieces.WK;
  board[squareToIndex(FILE.c, RANK.one, LEVEL.B)] = pieces.WQ;

  board[squareToIndex(FILE.a, RANK.five, LEVEL.D)] = pieces.BB;
  board[squareToIndex(FILE.d, RANK.five, LEVEL.D)] = pieces.BB;

  board[squareToIndex(FILE.b, RANK.five, LEVEL.D)] = pieces.BU;
  board[squareToIndex(FILE.e, RANK.five, LEVEL.D)] = pieces.BU;

  board[squareToIndex(FILE.a, RANK.five, LEVEL.E)] = pieces.BR;
  board[squareToIndex(FILE.e, RANK.five, LEVEL.E)] = pieces.BR;

  board[squareToIndex(FILE.b, RANK.five, LEVEL.E)] = pieces.BN;
  board[squareToIndex(FILE.d, RANK.five, LEVEL.E)] = pieces.BN;

  board[squareToIndex(FILE.c, RANK.five, LEVEL.E)] = pieces.BK;
  board[squareToIndex(FILE.c, RANK.five, LEVEL.D)] = pieces.BQ;
  return board;
};
