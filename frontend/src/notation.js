import { indexToSquare } from "./config";

const zAxis = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
};
const yAxis = {
  0: "1",
  1: "2",
  2: "3",
  3: "4",
  4: "5",
};
const xAxis = {
  0: "e",
  1: "d",
  2: "c",
  3: "b",
  4: "a",
};
const pieceNames = {
  1: "P",
  2: "N",
  3: "B",
  4: "R",
  5: "U",
  6: "Q",
  7: "K",
};

export const notation = (notationInput = [], piece, move) => {
  let moveToAdd = "";
  if (move.type === "Capture") {
    moveToAdd = `${pieceNames[Math.abs(piece)]} x${
      zAxis[indexToSquare(move.to).level]
    }${xAxis[indexToSquare(move.to).file]}${
      yAxis[indexToSquare(move.to).rank]
    }`;
  } else {
    moveToAdd = `${pieceNames[Math.abs(piece)]} ${
      zAxis[indexToSquare(move.to).level]
    }${xAxis[indexToSquare(move.to).file]}${
      yAxis[indexToSquare(move.to).rank]
    }`;
  }

  const notationList = notationInput;
  notationList.push(moveToAdd);
  return notationList;
};
