/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */

/* eslint-disable no-restricted-syntax */
class Coordinates {
  constructor(x, y, z, status = "") {
    this.x = x;
    this.y = y;
    this.z = z;
    this.type = status;
  }
}
function onlyInFirst(first, second) {
  // Looping through an array to find elements that don't exist in another array
  const newArr = [];
  for (let i = 0; i < first.length; i += 1) {
    if (second.indexOf(first[i]) === -1) {
      // Pushing the elements unique to first to newArr
      newArr.push(first[i]);
    }
  }
  return newArr;
}
const deletePieceFromState = (pieceInput, GameState) => {
  for (const piece in GameState) {
    if (GameState[piece] === pieceInput && GameState[piece].type !== "King") {
      // eslint-disable-next-line no-param-reassign
      delete GameState[piece];
    }
  }
  return "Not Found";
};
export const afterMove = async (piece, move, gameState) => {
  // eslint-disable-next-line prefer-object-spread
  const newState = JSON.parse(JSON.stringify(gameState));
  const temppiece = getPieceFromState(newState, piece.coordinates);
  for (const i in newState) {
    if (
      newState[i].coordinates.x === move.x &&
      newState[i].coordinates.y === move.y &&
      newState[i].coordinates.z === move.z
    )
      deletePieceFromState(
        getPieceFromState(newState, { x: move.x, y: move.y, z: move.z }),
        newState
      );
  }
  temppiece.coordinates.x = move.x;
  temppiece.coordinates.y = move.y;
  temppiece.coordinates.z = move.z;
  return newState;
};
export const getPieceFromState = (GameState, coordinates) => {
  for (const piece in GameState) {
    if (
      GameState[piece].coordinates.x === coordinates.x &&
      GameState[piece].coordinates.y === coordinates.y &&
      GameState[piece].coordinates.z === coordinates.z
    )
      return GameState[piece];
  }
  return null;
};

export const allMoves = async (piece) => {
  // eslint-disable-next-line prefer-const
  let movesList = [];
  if (piece.type === "WhitePawn") {
    let counter = 0;
    if (piece.coordinates.y + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y + 1,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y,
        piece.coordinates.z + 1
      );
      counter += 1;
    }
  } else if (piece.type === "BlackPawn") {
    let counter = 0;
    if (piece.coordinates.y - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y - 1,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y,
        piece.coordinates.z - 1
      );
      counter += 1;
    }
  } else if (piece.type === "Rook") {
    let counter = 0;
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.y + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y + i,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.y - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y - i,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }

    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
  } else if (piece.type === "Bishop") {
    let counter = 0;
    // x and y axis movements
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x + i < 5 && piece.coordinates.y + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y + i,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x + i < 5 && piece.coordinates.y - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y - i,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x - i > -1 && piece.coordinates.y + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y + i,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x - i > -1 && piece.coordinates.y - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y - i,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    // x and z axis movements
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x + i < 5 && piece.coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x + i < 5 && piece.coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x - i > -1 && piece.coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x - i > -1 && piece.coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
    // y and z axis movements
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.y + i < 5 && piece.coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y + i,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.y + i < 5 && piece.coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y + i,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.y - i > -1 && piece.coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y - i,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.y - i > -1 && piece.coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y - i,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
  } else if (piece.type === "Knight") {
    let counter = 0;
    // x-2 and y-1 axis movements/
    if (piece.coordinates.x + 2 < 5 && piece.coordinates.y + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 2,
        piece.coordinates.y + 1,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.x + 2 < 5 && piece.coordinates.y - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 2,
        piece.coordinates.y - 1,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.x - 2 > -1 && piece.coordinates.y + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 2,
        piece.coordinates.y + 1,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.x - 2 > -1 && piece.coordinates.y - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 2,
        piece.coordinates.y - 1,
        piece.coordinates.z
      );
      counter += 1;
    }
    // x-1 and y-2 axis movements
    if (piece.coordinates.x + 1 < 5 && piece.coordinates.y + 2 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 1,
        piece.coordinates.y + 2,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.x + 1 < 5 && piece.coordinates.y - 2 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 1,
        piece.coordinates.y - 2,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.x - 1 > -1 && piece.coordinates.y + 2 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 1,
        piece.coordinates.y + 2,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.x - 1 > -1 && piece.coordinates.y - 2 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 1,
        piece.coordinates.y - 2,
        piece.coordinates.z
      );
      counter += 1;
    }
    // x-2 and z-1 axis movements
    if (piece.coordinates.x + 2 < 5 && piece.coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 2,
        piece.coordinates.y,
        piece.coordinates.z + 1
      );
      counter += 1;
    }
    if (piece.coordinates.x + 2 < 5 && piece.coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 2,
        piece.coordinates.y,
        piece.coordinates.z - 1
      );
      counter += 1;
    }
    if (piece.coordinates.x - 2 > -1 && piece.coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 2,
        piece.coordinates.y,
        piece.coordinates.z + 1
      );
      counter += 1;
    }
    if (piece.coordinates.x - 2 > -1 && piece.coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 2,
        piece.coordinates.y,
        piece.coordinates.z - 1
      );
      counter += 1;
    }
    // x-1 and z-2 axis movements
    if (piece.coordinates.x + 1 < 5 && piece.coordinates.z + 2 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 1,
        piece.coordinates.y,
        piece.coordinates.z + 2
      );
      counter += 1;
    }
    if (piece.coordinates.x + 1 < 5 && piece.coordinates.z - 2 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 1,
        piece.coordinates.y,
        piece.coordinates.z - 2
      );
      counter += 1;
    }
    if (piece.coordinates.x - 1 > -1 && piece.coordinates.z + 2 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 1,
        piece.coordinates.y,
        piece.coordinates.z + 2
      );
      counter += 1;
    }
    if (piece.coordinates.x - 1 > -1 && piece.coordinates.z - 2 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 1,
        piece.coordinates.y,
        piece.coordinates.z - 2
      );
      counter += 1;
    }
    // y-2 and z-1 axis movements
    if (piece.coordinates.y + 2 < 5 && piece.coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y + 2,
        piece.coordinates.z + 1
      );
      counter += 1;
    }
    if (piece.coordinates.y + 2 < 5 && piece.coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y + 2,
        piece.coordinates.z - 1
      );
      counter += 1;
    }
    if (piece.coordinates.y - 2 > -1 && piece.coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y - 2,
        piece.coordinates.z + 1
      );
      counter += 1;
    }
    if (piece.coordinates.y - 2 > -1 && piece.coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y - 2,
        piece.coordinates.z - 1
      );
      counter += 1;
    }
    // y-1 and z-2 axis movements
    if (piece.coordinates.y + 1 < 5 && piece.coordinates.z + 2 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y + 1,
        piece.coordinates.z + 2
      );
      counter += 1;
    }
    if (piece.coordinates.y + 1 < 5 && piece.coordinates.z - 2 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y + 1,
        piece.coordinates.z - 2
      );
      counter += 1;
    }
    if (piece.coordinates.y - 1 > -1 && piece.coordinates.z + 2 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y - 1,
        piece.coordinates.z + 2
      );
      counter += 1;
    }
    if (piece.coordinates.y - 1 > -1 && piece.coordinates.z - 2 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y - 1,
        piece.coordinates.z - 2
      );
      counter += 1;
    }
  } else if (piece.type === "Unicorn") {
    // x-y-z axis movements
    let counter = 0;
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x + i < 5 &&
        piece.coordinates.y + i < 5 &&
        piece.coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y + i,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x + i < 5 &&
        piece.coordinates.y + i < 5 &&
        piece.coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y + i,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x + i < 5 &&
        piece.coordinates.y - i > -1 &&
        piece.coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y - i,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x - i > -1 &&
        piece.coordinates.y + i < 5 &&
        piece.coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y + i,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x + i < 5 &&
        piece.coordinates.y - i > -1 &&
        piece.coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y - i,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x - i > -1 &&
        piece.coordinates.y + i < 5 &&
        piece.coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y + i,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x - i > -1 &&
        piece.coordinates.y - i > -1 &&
        piece.coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y - i,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x - i > -1 &&
        piece.coordinates.y - i > -1 &&
        piece.coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y - i,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
  } else if (piece.type === "Queen") {
    let counter = 0;
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.y + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y + i,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.y - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y - i,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }

    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
    // x and y axis movements
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x + i < 5 && piece.coordinates.y + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y + i,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x + i < 5 && piece.coordinates.y - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y - i,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x - i > -1 && piece.coordinates.y + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y + i,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x - i > -1 && piece.coordinates.y - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y - i,
          piece.coordinates.z
        );
        counter += 1;
      }
    }
    // x and z axis movements
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x + i < 5 && piece.coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x + i < 5 && piece.coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x - i > -1 && piece.coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.x - i > -1 && piece.coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
    // y and z axis movements
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.y + i < 5 && piece.coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y + i,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.y + i < 5 && piece.coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y + i,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.y - i > -1 && piece.coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y - i,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (piece.coordinates.y - i > -1 && piece.coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x,
          piece.coordinates.y - i,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x + i < 5 &&
        piece.coordinates.y + i < 5 &&
        piece.coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y + i,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x + i < 5 &&
        piece.coordinates.y + i < 5 &&
        piece.coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y + i,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x + i < 5 &&
        piece.coordinates.y - i > -1 &&
        piece.coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y - i,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x - i > -1 &&
        piece.coordinates.y + i < 5 &&
        piece.coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y + i,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x + i < 5 &&
        piece.coordinates.y - i > -1 &&
        piece.coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x + i,
          piece.coordinates.y - i,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x - i > -1 &&
        piece.coordinates.y + i < 5 &&
        piece.coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y + i,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x - i > -1 &&
        piece.coordinates.y - i > -1 &&
        piece.coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y - i,
          piece.coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        piece.coordinates.x - i > -1 &&
        piece.coordinates.y - i > -1 &&
        piece.coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          piece.coordinates.x - i,
          piece.coordinates.y - i,
          piece.coordinates.z - i
        );
        counter += 1;
      }
    }
  } else if (piece.type === "King") {
    let counter = 0;
    if (piece.coordinates.x + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 1,
        piece.coordinates.y,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.x - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 1,
        piece.coordinates.y,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.y + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y + 1,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.y - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y - 1,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y,
        piece.coordinates.z + 1
      );
      counter += 1;
    }

    if (piece.coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y,
        piece.coordinates.z - 1
      );
      counter += 1;
    }
    // x and y axis movements
    if (piece.coordinates.x + 1 < 5 && piece.coordinates.y + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 1,
        piece.coordinates.y + 1,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.x + 1 < 5 && piece.coordinates.y - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 1,
        piece.coordinates.y - 1,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.x - 1 > -1 && piece.coordinates.y + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 1,
        piece.coordinates.y + 1,
        piece.coordinates.z
      );
      counter += 1;
    }
    if (piece.coordinates.x - 1 > -1 && piece.coordinates.y - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 1,
        piece.coordinates.y - 1,
        piece.coordinates.z
      );
      counter += 1;
    }
    // x and z axis movements
    if (piece.coordinates.x + 1 < 5 && piece.coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 1,
        piece.coordinates.y,
        piece.coordinates.z + 1
      );
      counter += 1;
    }
    if (piece.coordinates.x + 1 < 5 && piece.coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 1,
        piece.coordinates.y,
        piece.coordinates.z - 1
      );
      counter += 1;
    }
    if (piece.coordinates.x - 1 > -1 && piece.coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 1,
        piece.coordinates.y,
        piece.coordinates.z + 1
      );
      counter += 1;
    }
    if (piece.coordinates.x - 1 > -1 && piece.coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 1,
        piece.coordinates.y,
        piece.coordinates.z - 1
      );
      counter += 1;
    }
    // y and z axis movements
    if (piece.coordinates.y + 1 < 5 && piece.coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y + 1,
        piece.coordinates.z + 1
      );
      counter += 1;
    }
    if (piece.coordinates.y + 1 < 5 && piece.coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y + 1,
        piece.coordinates.z - 1
      );
      counter += 1;
    }
    if (piece.coordinates.y - 1 > -1 && piece.coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y - 1,
        piece.coordinates.z + 1
      );
      counter += 1;
    }
    if (piece.coordinates.y - 1 > -1 && piece.coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x,
        piece.coordinates.y - 1,
        piece.coordinates.z - 1
      );
      counter += 1;
    }
    if (
      piece.coordinates.x + 1 < 5 &&
      piece.coordinates.y + 1 < 5 &&
      piece.coordinates.z + 1 < 5
    ) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 1,
        piece.coordinates.y + 1,
        piece.coordinates.z + 1
      );
      counter += 1;
    }
    if (
      piece.coordinates.x + 1 < 5 &&
      piece.coordinates.y + 1 < 5 &&
      piece.coordinates.z - 1 > -1
    ) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 1,
        piece.coordinates.y + 1,
        piece.coordinates.z - 1
      );
      counter += 1;
    }
    if (
      piece.coordinates.x + 1 < 5 &&
      piece.coordinates.y - 1 > -1 &&
      piece.coordinates.z + 1 < 5
    ) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 1,
        piece.coordinates.y - 1,
        piece.coordinates.z + 1
      );
      counter += 1;
    }
    if (
      piece.coordinates.x - 1 > -1 &&
      piece.coordinates.y + 1 < 5 &&
      piece.coordinates.z + 1 < 5
    ) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 1,
        piece.coordinates.y + 1,
        piece.coordinates.z + 1
      );
      counter += 1;
    }
    if (
      piece.coordinates.x + 1 < 5 &&
      piece.coordinates.y - 1 > -1 &&
      piece.coordinates.z - 1 > -1
    ) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x + 1,
        piece.coordinates.y - 1,
        piece.coordinates.z - 1
      );
      counter += 1;
    }
    if (
      piece.coordinates.x - 1 > -1 &&
      piece.coordinates.y + 1 < 5 &&
      piece.coordinates.z - 1 > -1
    ) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 1,
        piece.coordinates.y + 1,
        piece.coordinates.z - 1
      );
      counter += 1;
    }
    if (
      piece.coordinates.x - 1 > -1 &&
      piece.coordinates.y - 1 > -1 &&
      piece.coordinates.z + 1 < 5
    ) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 1,
        piece.coordinates.y - 1,
        piece.coordinates.z + 1
      );
      counter += 1;
    }
    if (
      piece.coordinates.x - 1 > -1 &&
      piece.coordinates.y - 1 > -1 &&
      piece.coordinates.z - 1 > -1
    ) {
      movesList[counter] = new Coordinates(
        piece.coordinates.x - 1,
        piece.coordinates.y - 1,
        piece.coordinates.z - 1
      );
      counter += 1;
    }
  }
  return movesList;
};

// calculate blocked cubes
export const legalMoves = async (gameState, piece) => {
  const movesList = await allMoves(piece);
  const illegalMovesList = [];
  let vectorX;
  let vectorY;
  let vectorZ;
  let j = 0;
  if (piece.type === "BlackPawn") {
    for (const i in gameState) {
      for (const move in movesList) {
        if (
          (piece.coordinates.x === gameState[i].coordinates.x &&
            piece.coordinates.x === movesList[move].x &&
            piece.coordinates.y - 1 === gameState[i].coordinates.y &&
            piece.coordinates.y - 1 === movesList[move].y &&
            piece.coordinates.z === gameState[i].coordinates.z &&
            piece.coordinates.z === movesList[move].z) ||
          (piece.coordinates.x === gameState[i].coordinates.x &&
            piece.coordinates.x === movesList[move].x &&
            piece.coordinates.y === gameState[i].coordinates.y &&
            piece.coordinates.y === movesList[move].y &&
            piece.coordinates.z - 1 === gameState[i].coordinates.z &&
            piece.coordinates.z - 1 === movesList[move].z)
        )
          illegalMovesList.push(movesList[move]);
      }
      if (
        piece.coordinates.x - 1 > -1 &&
        piece.coordinates.y - 1 > -1 &&
        gameState[i].coordinates.x === piece.coordinates.x - 1 &&
        gameState[i].coordinates.y === piece.coordinates.y - 1 &&
        gameState[i].coordinates.z === piece.coordinates.z &&
        gameState[i].color !== piece.color
      ) {
        movesList.push(
          new Coordinates(
            piece.coordinates.x - 1,
            piece.coordinates.y - 1,
            piece.coordinates.z,
            "Capture"
          )
        );
      } else if (
        piece.coordinates.x + 1 < 5 &&
        piece.coordinates.y - 1 > -1 &&
        gameState[i].coordinates.x === piece.coordinates.x + 1 &&
        gameState[i].coordinates.y === piece.coordinates.y - 1 &&
        gameState[i].coordinates.z === piece.coordinates.z &&
        gameState[i].color !== piece.color
      ) {
        movesList.push(
          new Coordinates(
            piece.coordinates.x + 1,
            piece.coordinates.y - 1,
            piece.coordinates.z,
            "Capture"
          )
        );
      } else if (
        piece.coordinates.y - 1 > -1 &&
        piece.coordinates.z - 1 > -1 &&
        gameState[i].coordinates.x === piece.coordinates.x &&
        gameState[i].coordinates.y === piece.coordinates.y - 1 &&
        gameState[i].coordinates.z === piece.coordinates.z - 1 &&
        gameState[i].color !== piece.color
      ) {
        movesList.push(
          new Coordinates(
            piece.coordinates.x,
            piece.coordinates.y - 1,
            piece.coordinates.z - 1,
            "Capture"
          )
        );
      } else if (
        piece.coordinates.x + 1 < 5 &&
        piece.coordinates.z - 1 > -1 &&
        gameState[i].coordinates.x === piece.coordinates.x + 1 &&
        gameState[i].coordinates.y === piece.coordinates.y &&
        gameState[i].coordinates.z === piece.coordinates.z - 1 &&
        gameState[i].color !== piece.color
      ) {
        movesList.push(
          new Coordinates(
            piece.coordinates.x + 1,
            piece.coordinates.y,
            piece.coordinates.z - 1,
            "Capture"
          )
        );
      } else if (
        piece.coordinates.x - 1 > -1 &&
        piece.coordinates.z - 1 > -1 &&
        gameState[i].coordinates.x === piece.coordinates.x - 1 &&
        gameState[i].coordinates.y === piece.coordinates.y &&
        gameState[i].coordinates.z === piece.coordinates.z - 1 &&
        gameState[i].color !== piece.color
      ) {
        movesList.push(
          new Coordinates(
            piece.coordinates.x - 1,
            piece.coordinates.y,
            piece.coordinates.z - 1,
            "Capture"
          )
        );
      }
    }
  } else if (piece.type === "WhitePawn") {
    for (const i in gameState) {
      for (const move in movesList) {
        if (
          (piece.coordinates.x === gameState[i].coordinates.x &&
            piece.coordinates.x === movesList[move].x &&
            piece.coordinates.y + 1 === gameState[i].coordinates.y &&
            piece.coordinates.y + 1 === movesList[move].y &&
            piece.coordinates.z === gameState[i].coordinates.z &&
            piece.coordinates.z === movesList[move].z) ||
          (piece.coordinates.x === gameState[i].coordinates.x &&
            piece.coordinates.x === movesList[move].x &&
            piece.coordinates.y === gameState[i].coordinates.y &&
            piece.coordinates.y === movesList[move].y &&
            piece.coordinates.z + 1 === gameState[i].coordinates.z &&
            piece.coordinates.z + 1 === movesList[move].z)
        )
          illegalMovesList.push(movesList[move]);
      }
      if (
        piece.coordinates.x - 1 > -1 &&
        piece.coordinates.y + 1 < 5 &&
        gameState[i].coordinates.x === piece.coordinates.x - 1 &&
        gameState[i].coordinates.y === piece.coordinates.y + 1 &&
        gameState[i].coordinates.z === piece.coordinates.z &&
        gameState[i].color !== piece.color
      ) {
        movesList.push(
          new Coordinates(
            piece.coordinates.x - 1,
            piece.coordinates.y + 1,
            piece.coordinates.z,
            "Capture"
          )
        );
      } else if (
        piece.coordinates.x + 1 < 5 &&
        piece.coordinates.y + 1 < 5 &&
        gameState[i].coordinates.x === piece.coordinates.x + 1 &&
        gameState[i].coordinates.y === piece.coordinates.y + 1 &&
        gameState[i].coordinates.z === piece.coordinates.z &&
        gameState[i].color !== piece.color
      ) {
        movesList.push(
          new Coordinates(
            piece.coordinates.x + 1,
            piece.coordinates.y + 1,
            piece.coordinates.z,
            "Capture"
          )
        );
      } else if (
        piece.coordinates.y + 1 < 5 &&
        piece.coordinates.z + 1 < 5 &&
        gameState[i].coordinates.x === piece.coordinates.x &&
        gameState[i].coordinates.y === piece.coordinates.y + 1 &&
        gameState[i].coordinates.z === piece.coordinates.z + 1 &&
        gameState[i].color !== piece.color
      ) {
        movesList.push(
          new Coordinates(
            piece.coordinates.x,
            piece.coordinates.y + 1,
            piece.coordinates.z + 1,
            "Capture"
          )
        );
      } else if (
        piece.coordinates.x + 1 < 5 &&
        piece.coordinates.z + 1 < 5 &&
        gameState[i].coordinates.x === piece.coordinates.x + 1 &&
        gameState[i].coordinates.y === piece.coordinates.y &&
        gameState[i].coordinates.z === piece.coordinates.z + 1 &&
        gameState[i].color !== piece.color
      ) {
        movesList.push(
          new Coordinates(
            piece.coordinates.x + 1,
            piece.coordinates.y,
            piece.coordinates.z + 1,
            "Capture"
          )
        );
      } else if (
        piece.coordinates.x - 1 > -1 &&
        piece.coordinates.z + 1 < 5 &&
        gameState[i].coordinates.x === piece.coordinates.x - 1 &&
        gameState[i].coordinates.y === piece.coordinates.y &&
        gameState[i].coordinates.z === piece.coordinates.z + 1 &&
        gameState[i].color !== piece.color
      ) {
        movesList.push(
          new Coordinates(
            piece.coordinates.x - 1,
            piece.coordinates.y,
            piece.coordinates.z + 1,
            "Capture"
          )
        );
      }
    }
  } else if (piece.type === "Knight") {
    while (movesList[j]) {
      // eslint-disable-next-line guard-for-in
      for (const i in gameState) {
        if (
          gameState[i].coordinates.x === movesList[j].x &&
          gameState[i].coordinates.y === movesList[j].y &&
          gameState[i].coordinates.z === movesList[j].z
        ) {
          if (gameState[i].color === piece.color) {
            const index = illegalMovesList.findIndex(
              // eslint-disable-next-line no-loop-func
              (move) => move === movesList[j]
            );
            if (index === -1) illegalMovesList.push(movesList[j]);
          } else {
            movesList[j].type = "Capture";
          }
        }
      }
      j += 1;
    }
    j = 0;
  } else {
    while (movesList[j]) {
      // eslint-disable-next-line guard-for-in
      for (const i in gameState) {
        if (
          gameState[i].coordinates.x === movesList[j].x &&
          gameState[i].coordinates.y === movesList[j].y &&
          gameState[i].coordinates.z === movesList[j].z &&
          gameState[i].color === piece.color
        ) {
          vectorX = movesList[j].x - piece.coordinates.x;
          vectorY = movesList[j].y - piece.coordinates.y;
          vectorZ = movesList[j].z - piece.coordinates.z;

          if (vectorX !== 0) vectorX /= Math.abs(vectorX);
          if (vectorY !== 0) vectorY /= Math.abs(vectorY);
          if (vectorZ !== 0) vectorZ /= Math.abs(vectorZ);
          for (
            let k = movesList[j].x, l = movesList[j].y, m = movesList[j].z;
            k < 5 && k > -1 && l < 5 && l > -1 && m < 5 && m > -1;
            k += vectorX, l += vectorY, m += vectorZ
          ) {
            for (let n = 0; n < movesList.length; n += 1) {
              if (
                k === movesList[n].x &&
                l === movesList[n].y &&
                m === movesList[n].z
              ) {
                const index = illegalMovesList.findIndex(
                  (x) => x === movesList[n]
                );
                if (index === -1) illegalMovesList.push(movesList[n]);
              }
            }
          }
        } else if (
          gameState[i].coordinates.x === movesList[j].x &&
          gameState[i].coordinates.y === movesList[j].y &&
          gameState[i].coordinates.z === movesList[j].z &&
          gameState[i].color !== piece.color
        ) {
          movesList[j].type = "Capture";
          vectorX = movesList[j].x - piece.coordinates.x;
          vectorY = movesList[j].y - piece.coordinates.y;
          vectorZ = movesList[j].z - piece.coordinates.z;

          if (vectorX !== 0) vectorX /= Math.abs(vectorX);
          if (vectorY !== 0) vectorY /= Math.abs(vectorY);
          if (vectorZ !== 0) vectorZ /= Math.abs(vectorZ);
          for (
            let k = movesList[j].x + vectorX,
              l = movesList[j].y + vectorY,
              m = movesList[j].z + vectorZ;
            k < 5 && k > -1 && l < 5 && l > -1 && m < 5 && m > -1;
            k += vectorX, l += vectorY, m += vectorZ
          ) {
            for (let n = 0; n < movesList.length; n += 1) {
              if (
                k === movesList[n].x &&
                l === movesList[n].y &&
                m === movesList[n].z
              ) {
                const index = illegalMovesList.findIndex(
                  (x) => x === movesList[n]
                );
                if (index === -1) illegalMovesList.push(movesList[n]);
              }
            }
          }
        }
      }

      j += 1;
    }
  }
  return onlyInFirst(movesList, illegalMovesList);
};

export const isCheck = async (gameState, king) => {
  let isInCheck = false;
  for (const i in gameState) {
    if (gameState[i].color !== king.color) {
      const movesList = await legalMoves(gameState, gameState[i]);
      for (const j in movesList) {
        if (
          movesList[j].x === king.coordinates.x &&
          movesList[j].y === king.coordinates.y &&
          movesList[j].z === king.coordinates.z
        ) {
          isInCheck = true;
        }
      }
    }
  }
  return isInCheck;
};

// this function returns
export const inCheckMoves = async (gameState, piece) => {
  const legalMovesList = await legalMoves(gameState, piece);
  const resultList = [];

  for (const i in legalMovesList) {
    let king;
    if (piece.color === "Black") {
      king = (await afterMove(piece, legalMovesList[i], gameState)).bk;
    } else {
      king = (await afterMove(piece, legalMovesList[i], gameState)).wk;
    }
    if (
      (await isCheck(
        await afterMove(piece, legalMovesList[i], gameState),
        king
      )) === false
    ) {
      resultList.push(legalMovesList[i]);
    }
  }
  return resultList;
};

export const finalMoves = async (gameState, piece) => {
  const legalMovesList = await legalMoves(gameState, piece);
  let resultList = [];
  let king;
  if (piece.color === "Black") {
    king = gameState.bk;
  } else {
    king = gameState.wk;
  }
  if ((await isCheck(gameState, king)) === true) {
    resultList = inCheckMoves(gameState, piece);
  } else {
    for (const i in legalMovesList) {
      if (piece.color === "Black") {
        king = (await afterMove(piece, legalMovesList[i], gameState)).bk;
      } else {
        king = (await afterMove(piece, legalMovesList[i], gameState)).wk;
      }
      if (
        (await isCheck(
          await afterMove(piece, legalMovesList[i], gameState),
          king
        )) === false
      ) {
        resultList.push(legalMovesList[i]);
      }
    }
  }
  return resultList;
};
export const checkMate = async (gameState) => {
  let isCheckMate = false;
  if (isCheck(gameState, gameState.bk)) {
    console.log("geldim");
    isCheckMate = "Black Checkmated";
    for (const i in gameState) {
      if (
        gameState[i].color === "Black" &&
        (await finalMoves(gameState, gameState[i])).length !== 0
      ) {
        isCheckMate = false;
        console.log("geldim");
      }
    }
  } else if (isCheck(gameState, gameState.wk)) {
    isCheckMate = "White Checkmated";
    for (const i in gameState) {
      if (
        gameState[i].color === "White" &&
        (await finalMoves(gameState, gameState[i])).length !== 0
      ) {
        isCheckMate = false;
      }
    }
  }
  return isCheckMate;
};
