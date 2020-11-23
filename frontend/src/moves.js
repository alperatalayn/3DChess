/* eslint-disable no-restricted-syntax */
class Coordinates {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
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
export const legalMoves = async (gameState, type, coordinates) => {
  const movesList = await allMoves(type, coordinates);
  const illegalMovesList = [];
  let vectorX;
  let vectorY;
  let vectorZ;
  if (type === "Knight") {
    // TODO: implement rules
  } else {
    let j = 0;
    while (movesList[j]) {
      // eslint-disable-next-line guard-for-in
      for (const i in gameState) {
        if (
          gameState[i].coordinates.x === movesList[j].x &&
          gameState[i].coordinates.y === movesList[j].y &&
          gameState[i].coordinates.z === movesList[j].z
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
                // here you can check specific property for an object whether it exist in your array or not

                if (index === -1) illegalMovesList.push(movesList[n]);
              }
            }
          }
        }
      }

      j += 1;
    }
  }
  console.log(movesList);
  console.log(illegalMovesList);
  console.log({
    a: movesList.length,
    b: illegalMovesList.length,
    c: movesList.length - illegalMovesList.length,
  });
  return onlyInFirst(movesList, illegalMovesList);
};
