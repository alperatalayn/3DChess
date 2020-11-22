class Coordinates {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
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
export const legalMoves = async () => {};
