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
export const notation = (notationInput = [], piece, coordinates, type) => {
  const move = { movedPiece: piece, text: "", moveType: type };
  move.text =
    zAxis[coordinates.z] + xAxis[coordinates.x] + yAxis[coordinates.y];
  const notationList = notationInput;
  notationList.push(move);
  return notationList;
};
