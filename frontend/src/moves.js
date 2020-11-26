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
    if (GameState[piece] === pieceInput) {
      // eslint-disable-next-line no-param-reassign
      delete GameState[piece];
    }
  }
  return "Not Found";
};
function afterMove(coordinates, move, gameState) {
  // eslint-disable-next-line prefer-object-spread
  const newState = JSON.parse(JSON.stringify(gameState));
  const piece = getPieceFromState(newState, coordinates);
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
  piece.coordinates.x = move.x;
  piece.coordinates.y = move.y;
  piece.coordinates.z = move.z;
  return newState;
}
export const getPieceFromState = (GameState, coordinates) => {
  for (const piece in GameState) {
    if (
      GameState[piece].coordinates.x === coordinates.x &&
      GameState[piece].coordinates.y === coordinates.y &&
      GameState[piece].coordinates.z === coordinates.z
    )
      return GameState[piece];
  }
  return "Not Found";
};

export const allMoves = async (type, coordinates) => {
  // eslint-disable-next-line prefer-const
  let movesList = [];
  if (type === "WhitePawn") {
    let counter = 0;
    if (coordinates.y + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y + 1,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y,
        coordinates.z + 1
      );
      counter += 1;
    }
  } else if (type === "BlackPawn") {
    let counter = 0;
    if (coordinates.y - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y - 1,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y,
        coordinates.z - 1
      );
      counter += 1;
    }
  } else if (type === "Rook") {
    let counter = 0;
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y,
          coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y,
          coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.y + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y + i,
          coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.y - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y - i,
          coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y,
          coordinates.z + i
        );
        counter += 1;
      }
    }

    for (let i = 1; i < 5; i += 1) {
      if (coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y,
          coordinates.z - i
        );
        counter += 1;
      }
    }
  } else if (type === "Bishop") {
    let counter = 0;
    // x and y axis movements
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x + i < 5 && coordinates.y + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y + i,
          coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x + i < 5 && coordinates.y - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y - i,
          coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x - i > -1 && coordinates.y + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y + i,
          coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x - i > -1 && coordinates.y - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y - i,
          coordinates.z
        );
        counter += 1;
      }
    }
    // x and z axis movements
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x + i < 5 && coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x + i < 5 && coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y,
          coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x - i > -1 && coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x - i > -1 && coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y,
          coordinates.z - i
        );
        counter += 1;
      }
    }
    // y and z axis movements
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.y + i < 5 && coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y + i,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.y + i < 5 && coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y + i,
          coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.y - i > -1 && coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y - i,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.y - i > -1 && coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y - i,
          coordinates.z - i
        );
        counter += 1;
      }
    }
  } else if (type === "Knight") {
    let counter = 0;
    // x-2 and y-1 axis movements/
    if (coordinates.x + 2 < 5 && coordinates.y + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x + 2,
        coordinates.y + 1,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.x + 2 < 5 && coordinates.y - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x + 2,
        coordinates.y - 1,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.x - 2 > -1 && coordinates.y + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x - 2,
        coordinates.y + 1,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.x - 2 > -1 && coordinates.y - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x - 2,
        coordinates.y - 1,
        coordinates.z
      );
      counter += 1;
    }
    // x-1 and y-2 axis movements
    if (coordinates.x + 1 < 5 && coordinates.y + 2 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x + 1,
        coordinates.y + 2,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.x + 1 < 5 && coordinates.y - 2 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x + 1,
        coordinates.y - 2,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.x - 1 > -1 && coordinates.y + 2 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x - 1,
        coordinates.y + 2,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.x - 1 > -1 && coordinates.y - 2 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x - 1,
        coordinates.y - 2,
        coordinates.z
      );
      counter += 1;
    }
    // x-2 and z-1 axis movements
    if (coordinates.x + 2 < 5 && coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x + 2,
        coordinates.y,
        coordinates.z + 1
      );
      counter += 1;
    }
    if (coordinates.x + 2 < 5 && coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x + 2,
        coordinates.y,
        coordinates.z - 1
      );
      counter += 1;
    }
    if (coordinates.x - 2 > -1 && coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x - 2,
        coordinates.y,
        coordinates.z + 1
      );
      counter += 1;
    }
    if (coordinates.x - 2 > -1 && coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x - 2,
        coordinates.y,
        coordinates.z - 1
      );
      counter += 1;
    }
    // x-1 and z-2 axis movements
    if (coordinates.x + 1 < 5 && coordinates.z + 2 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x + 1,
        coordinates.y,
        coordinates.z + 2
      );
      counter += 1;
    }
    if (coordinates.x + 1 < 5 && coordinates.z - 2 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x + 1,
        coordinates.y,
        coordinates.z - 2
      );
      counter += 1;
    }
    if (coordinates.x - 1 > -1 && coordinates.z + 2 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x - 1,
        coordinates.y,
        coordinates.z + 2
      );
      counter += 1;
    }
    if (coordinates.x - 1 > -1 && coordinates.z - 2 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x - 1,
        coordinates.y,
        coordinates.z - 2
      );
      counter += 1;
    }
    // y-2 and z-1 axis movements
    if (coordinates.y + 2 < 5 && coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y + 2,
        coordinates.z + 1
      );
      counter += 1;
    }
    if (coordinates.y + 2 < 5 && coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y + 2,
        coordinates.z - 1
      );
      counter += 1;
    }
    if (coordinates.y - 2 > -1 && coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y - 2,
        coordinates.z + 1
      );
      counter += 1;
    }
    if (coordinates.y - 2 > -1 && coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y - 2,
        coordinates.z - 1
      );
      counter += 1;
    }
    // y-1 and z-2 axis movements
    if (coordinates.y + 1 < 5 && coordinates.z + 2 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y + 1,
        coordinates.z + 2
      );
      counter += 1;
    }
    if (coordinates.y + 1 < 5 && coordinates.z - 2 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y + 1,
        coordinates.z - 2
      );
      counter += 1;
    }
    if (coordinates.y - 1 > -1 && coordinates.z + 2 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y - 1,
        coordinates.z + 2
      );
      counter += 1;
    }
    if (coordinates.y - 1 > -1 && coordinates.z - 2 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y - 1,
        coordinates.z - 2
      );
      counter += 1;
    }
  } else if (type === "Unicorn") {
    // x-y-z axis movements
    let counter = 0;
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x + i < 5 &&
        coordinates.y + i < 5 &&
        coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y + i,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x + i < 5 &&
        coordinates.y + i < 5 &&
        coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y + i,
          coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x + i < 5 &&
        coordinates.y - i > -1 &&
        coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y - i,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x - i > -1 &&
        coordinates.y + i < 5 &&
        coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y + i,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x + i < 5 &&
        coordinates.y - i > -1 &&
        coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y - i,
          coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x - i > -1 &&
        coordinates.y + i < 5 &&
        coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y + i,
          coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x - i > -1 &&
        coordinates.y - i > -1 &&
        coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y - i,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x - i > -1 &&
        coordinates.y - i > -1 &&
        coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y - i,
          coordinates.z - i
        );
        counter += 1;
      }
    }
  } else if (type === "Queen") {
    let counter = 0;
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y,
          coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y,
          coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.y + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y + i,
          coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.y - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y - i,
          coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y,
          coordinates.z + i
        );
        counter += 1;
      }
    }

    for (let i = 1; i < 5; i += 1) {
      if (coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y,
          coordinates.z - i
        );
        counter += 1;
      }
    }
    // x and y axis movements
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x + i < 5 && coordinates.y + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y + i,
          coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x + i < 5 && coordinates.y - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y - i,
          coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x - i > -1 && coordinates.y + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y + i,
          coordinates.z
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x - i > -1 && coordinates.y - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y - i,
          coordinates.z
        );
        counter += 1;
      }
    }
    // x and z axis movements
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x + i < 5 && coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x + i < 5 && coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y,
          coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x - i > -1 && coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.x - i > -1 && coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y,
          coordinates.z - i
        );
        counter += 1;
      }
    }
    // y and z axis movements
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.y + i < 5 && coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y + i,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.y + i < 5 && coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y + i,
          coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.y - i > -1 && coordinates.z + i < 5) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y - i,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (coordinates.y - i > -1 && coordinates.z - i > -1) {
        movesList[counter] = new Coordinates(
          coordinates.x,
          coordinates.y - i,
          coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x + i < 5 &&
        coordinates.y + i < 5 &&
        coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y + i,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x + i < 5 &&
        coordinates.y + i < 5 &&
        coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y + i,
          coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x + i < 5 &&
        coordinates.y - i > -1 &&
        coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y - i,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x - i > -1 &&
        coordinates.y + i < 5 &&
        coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y + i,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x + i < 5 &&
        coordinates.y - i > -1 &&
        coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x + i,
          coordinates.y - i,
          coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x - i > -1 &&
        coordinates.y + i < 5 &&
        coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y + i,
          coordinates.z - i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x - i > -1 &&
        coordinates.y - i > -1 &&
        coordinates.z + i < 5
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y - i,
          coordinates.z + i
        );
        counter += 1;
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        coordinates.x - i > -1 &&
        coordinates.y - i > -1 &&
        coordinates.z - i > -1
      ) {
        movesList[counter] = new Coordinates(
          coordinates.x - i,
          coordinates.y - i,
          coordinates.z - i
        );
        counter += 1;
      }
    }
  } else if (type === "King") {
    let counter = 0;
    if (coordinates.x + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x + 1,
        coordinates.y,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.x - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x - 1,
        coordinates.y,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.y + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y + 1,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.y - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y - 1,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y,
        coordinates.z + 1
      );
      counter += 1;
    }

    if (coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y,
        coordinates.z - 1
      );
      counter += 1;
    }
    // x and y axis movements
    if (coordinates.x + 1 < 5 && coordinates.y + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x + 1,
        coordinates.y + 1,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.x + 1 < 5 && coordinates.y - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x + 1,
        coordinates.y - 1,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.x - 1 > -1 && coordinates.y + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x - 1,
        coordinates.y + 1,
        coordinates.z
      );
      counter += 1;
    }
    if (coordinates.x - 1 > -1 && coordinates.y - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x - 1,
        coordinates.y - 1,
        coordinates.z
      );
      counter += 1;
    }
    // x and z axis movements
    if (coordinates.x + 1 < 5 && coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x + 1,
        coordinates.y,
        coordinates.z + 1
      );
      counter += 1;
    }
    if (coordinates.x + 1 < 5 && coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x + 1,
        coordinates.y,
        coordinates.z - 1
      );
      counter += 1;
    }
    if (coordinates.x - 1 > -1 && coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x - 1,
        coordinates.y,
        coordinates.z + 1
      );
      counter += 1;
    }
    if (coordinates.x - 1 > -1 && coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x - 1,
        coordinates.y,
        coordinates.z - 1
      );
      counter += 1;
    }
    // y and z axis movements
    if (coordinates.y + 1 < 5 && coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y + 1,
        coordinates.z + 1
      );
      counter += 1;
    }
    if (coordinates.y + 1 < 5 && coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y + 1,
        coordinates.z - 1
      );
      counter += 1;
    }
    if (coordinates.y - 1 > -1 && coordinates.z + 1 < 5) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y - 1,
        coordinates.z + 1
      );
      counter += 1;
    }
    if (coordinates.y - 1 > -1 && coordinates.z - 1 > -1) {
      movesList[counter] = new Coordinates(
        coordinates.x,
        coordinates.y - 1,
        coordinates.z - 1
      );
      counter += 1;
    }
    if (
      coordinates.x + 1 < 5 &&
      coordinates.y + 1 < 5 &&
      coordinates.z + 1 < 5
    ) {
      movesList[counter] = new Coordinates(
        coordinates.x + 1,
        coordinates.y + 1,
        coordinates.z + 1
      );
      counter += 1;
    }
    if (
      coordinates.x + 1 < 5 &&
      coordinates.y + 1 < 5 &&
      coordinates.z - 1 > -1
    ) {
      movesList[counter] = new Coordinates(
        coordinates.x + 1,
        coordinates.y + 1,
        coordinates.z - 1
      );
      counter += 1;
    }
    if (
      coordinates.x + 1 < 5 &&
      coordinates.y - 1 > -1 &&
      coordinates.z + 1 < 5
    ) {
      movesList[counter] = new Coordinates(
        coordinates.x + 1,
        coordinates.y - 1,
        coordinates.z + 1
      );
      counter += 1;
    }
    if (
      coordinates.x - 1 > -1 &&
      coordinates.y + 1 < 5 &&
      coordinates.z + 1 < 5
    ) {
      movesList[counter] = new Coordinates(
        coordinates.x - 1,
        coordinates.y + 1,
        coordinates.z + 1
      );
      counter += 1;
    }
    if (
      coordinates.x + 1 < 5 &&
      coordinates.y - 1 > -1 &&
      coordinates.z - 1 > -1
    ) {
      movesList[counter] = new Coordinates(
        coordinates.x + 1,
        coordinates.y - 1,
        coordinates.z - 1
      );
      counter += 1;
    }
    if (
      coordinates.x - 1 > -1 &&
      coordinates.y + 1 < 5 &&
      coordinates.z - 1 > -1
    ) {
      movesList[counter] = new Coordinates(
        coordinates.x - 1,
        coordinates.y + 1,
        coordinates.z - 1
      );
      counter += 1;
    }
    if (
      coordinates.x - 1 > -1 &&
      coordinates.y - 1 > -1 &&
      coordinates.z + 1 < 5
    ) {
      movesList[counter] = new Coordinates(
        coordinates.x - 1,
        coordinates.y - 1,
        coordinates.z + 1
      );
      counter += 1;
    }
    if (
      coordinates.x - 1 > -1 &&
      coordinates.y - 1 > -1 &&
      coordinates.z - 1 > -1
    ) {
      movesList[counter] = new Coordinates(
        coordinates.x - 1,
        coordinates.y - 1,
        coordinates.z - 1
      );
      counter += 1;
    }
  }
  return movesList;
};

// calculate blocked cubes
export const legalMoves = async (gameState, type, coordinates, color) => {
  const movesList = await allMoves(type, coordinates);
  const illegalMovesList = [];
  let vectorX;
  let vectorY;
  let vectorZ;
  let j = 0;
  if (type === "BlackPawn") {
    for (const i in gameState) {
      for (const move in movesList) {
        if (
          (coordinates.y - 1 === gameState[i].coordinates.y &&
            coordinates.y - 1 === movesList[move].y &&
            coordinates.z === gameState[i].coordinates.z &&
            coordinates.z === movesList[move].z) ||
          (coordinates.y === gameState[i].coordinates.y &&
            coordinates.y === movesList[move].y &&
            coordinates.z - 1 === gameState[i].coordinates.z &&
            coordinates.z - 1 === movesList[move].z)
        )
          illegalMovesList.push(movesList[move]);
      }
      if (
        coordinates.x - 1 > -1 &&
        coordinates.y - 1 > -1 &&
        gameState[i].coordinates.x === coordinates.x - 1 &&
        gameState[i].coordinates.y === coordinates.y - 1 &&
        gameState[i].coordinates.z === coordinates.z &&
        gameState[i].color !== color
      ) {
        movesList.push(
          new Coordinates(
            coordinates.x - 1,
            coordinates.y - 1,
            coordinates.z,
            "Capture"
          )
        );
      } else if (
        coordinates.x + 1 < 5 &&
        coordinates.y - 1 > -1 &&
        gameState[i].coordinates.x === coordinates.x + 1 &&
        gameState[i].coordinates.y === coordinates.y - 1 &&
        gameState[i].coordinates.z === coordinates.z &&
        gameState[i].color !== color
      ) {
        movesList.push(
          new Coordinates(
            coordinates.x + 1,
            coordinates.y - 1,
            coordinates.z,
            "Capture"
          )
        );
      } else if (
        coordinates.y - 1 > -1 &&
        coordinates.z - 1 > -1 &&
        gameState[i].coordinates.x === coordinates.x &&
        gameState[i].coordinates.y === coordinates.y - 1 &&
        gameState[i].coordinates.z === coordinates.z - 1 &&
        gameState[i].color !== color
      ) {
        movesList.push(
          new Coordinates(
            coordinates.x,
            coordinates.y - 1,
            coordinates.z - 1,
            "Capture"
          )
        );
      } else if (
        coordinates.x + 1 < 5 &&
        coordinates.z - 1 > -1 &&
        gameState[i].coordinates.x === coordinates.x + 1 &&
        gameState[i].coordinates.y === coordinates.y &&
        gameState[i].coordinates.z === coordinates.z - 1 &&
        gameState[i].color !== color
      ) {
        movesList.push(
          new Coordinates(
            coordinates.x + 1,
            coordinates.y,
            coordinates.z - 1,
            "Capture"
          )
        );
      } else if (
        coordinates.x - 1 > -1 &&
        coordinates.z - 1 > -1 &&
        gameState[i].coordinates.x === coordinates.x - 1 &&
        gameState[i].coordinates.y === coordinates.y &&
        gameState[i].coordinates.z === coordinates.z - 1 &&
        gameState[i].color !== color
      ) {
        movesList.push(
          new Coordinates(
            coordinates.x - 1,
            coordinates.y,
            coordinates.z - 1,
            "Capture"
          )
        );
      }
    }
  } else if (type === "WhitePawn") {
    for (const i in gameState) {
      for (const move in movesList) {
        if (
          (coordinates.y + 1 === gameState[i].coordinates.y &&
            coordinates.y + 1 === movesList[move].y &&
            coordinates.z === gameState[i].coordinates.z &&
            coordinates.z === movesList[move].z) ||
          (coordinates.y === gameState[i].coordinates.y &&
            coordinates.y === movesList[move].y &&
            coordinates.z + 1 === gameState[i].coordinates.z &&
            coordinates.z + 1 === movesList[move].z)
        )
          illegalMovesList.push(movesList[move]);
      }
      if (
        coordinates.x - 1 > -1 &&
        coordinates.y + 1 < 5 &&
        gameState[i].coordinates.x === coordinates.x - 1 &&
        gameState[i].coordinates.y === coordinates.y + 1 &&
        gameState[i].coordinates.z === coordinates.z &&
        gameState[i].color !== color
      ) {
        movesList.push(
          new Coordinates(
            coordinates.x - 1,
            coordinates.y + 1,
            coordinates.z,
            "Capture"
          )
        );
      } else if (
        coordinates.x + 1 < 5 &&
        coordinates.y + 1 < 5 &&
        gameState[i].coordinates.x === coordinates.x + 1 &&
        gameState[i].coordinates.y === coordinates.y + 1 &&
        gameState[i].coordinates.z === coordinates.z &&
        gameState[i].color !== color
      ) {
        movesList.push(
          new Coordinates(
            coordinates.x + 1,
            coordinates.y + 1,
            coordinates.z,
            "Capture"
          )
        );
      } else if (
        coordinates.y + 1 < 5 &&
        coordinates.z + 1 < 5 &&
        gameState[i].coordinates.x === coordinates.x &&
        gameState[i].coordinates.y === coordinates.y + 1 &&
        gameState[i].coordinates.z === coordinates.z + 1 &&
        gameState[i].color !== color
      ) {
        movesList.push(
          new Coordinates(
            coordinates.x,
            coordinates.y + 1,
            coordinates.z + 1,
            "Capture"
          )
        );
      } else if (
        coordinates.x + 1 < 5 &&
        coordinates.z + 1 < 5 &&
        gameState[i].coordinates.x === coordinates.x + 1 &&
        gameState[i].coordinates.y === coordinates.y &&
        gameState[i].coordinates.z === coordinates.z + 1 &&
        gameState[i].color !== color
      ) {
        movesList.push(
          new Coordinates(
            coordinates.x + 1,
            coordinates.y,
            coordinates.z + 1,
            "Capture"
          )
        );
      } else if (
        coordinates.x - 1 > -1 &&
        coordinates.z + 1 < 5 &&
        gameState[i].coordinates.x === coordinates.x - 1 &&
        gameState[i].coordinates.y === coordinates.y &&
        gameState[i].coordinates.z === coordinates.z + 1 &&
        gameState[i].color !== color
      ) {
        movesList.push(
          new Coordinates(
            coordinates.x - 1,
            coordinates.y,
            coordinates.z + 1,
            "Capture"
          )
        );
      }
    }
  } else if (type === "Knight") {
    while (movesList[j]) {
      // eslint-disable-next-line guard-for-in
      for (const i in gameState) {
        if (
          gameState[i].coordinates.x === movesList[j].x &&
          gameState[i].coordinates.y === movesList[j].y &&
          gameState[i].coordinates.z === movesList[j].z
        ) {
          if (gameState[i].color === color) {
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
          gameState[i].color === color
        ) {
          vectorX = movesList[j].x - coordinates.x;
          vectorY = movesList[j].y - coordinates.y;
          vectorZ = movesList[j].z - coordinates.z;

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
          gameState[i].color !== color
        ) {
          movesList[j].type = "Capture";
          vectorX = movesList[j].x - coordinates.x;
          vectorY = movesList[j].y - coordinates.y;
          vectorZ = movesList[j].z - coordinates.z;

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

export const isCheck = async (gameState, coordinates, color) => {
  let isInCheck = false;
  for (const i in gameState) {
    if (gameState[i].color !== color) {
      const movesList = await legalMoves(
        gameState,
        gameState[i].type,
        gameState[i].coordinates,
        gameState[i].color
      );
      for (const j in movesList) {
        if (
          movesList[j].x === coordinates.x &&
          movesList[j].y === coordinates.y &&
          movesList[j].z === coordinates.z
        ) {
          isInCheck = true;
        }
      }
    }
  }
  console.log(isInCheck);
  return isInCheck;
};

// this function returns
export const inCheckMoves = async (legalMovesList, gameState, coordinates) => {
  const resultList = [];
  for (const i in legalMovesList) {
    if (
      (await isCheck(
        afterMove(coordinates, legalMovesList[i], gameState),
        gameState.wk.coordinates,
        gameState.wk.color
      )) === false
    ) {
      console.log(legalMovesList);
      resultList.push(legalMovesList[i]);
    }
  }
  return resultList;
};
