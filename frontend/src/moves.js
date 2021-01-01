import { indexToSquare, squareToIndex, pieces } from "./config";

class Move {
  constructor(from, to, type = "") {
    this.from = from;
    this.to = to;
    this.type = type;
  }
}

/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

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
export const allMoves = async (piece) => {
  // eslint-disable-next-line prefer-const
  let movesList = [];
  if (piece.type === pieces.WP) {
    if (indexToSquare(piece.index).rank + 1 < 5) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank + 1,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (indexToSquare(piece.index).level + 1 < 5) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level + 1
          )
        )
      );
    }
  } else if (piece.type === pieces.BP) {
    if (indexToSquare(piece.index).rank - 1 > -1) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank - 1,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (indexToSquare(piece.index).level - 1 > -1) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level - 1
          )
        )
      );
    }
  } else if (piece.type === pieces.WR || piece.type === pieces.BR) {
    for (let i = 1; i < 5; i += 1) {
      if (indexToSquare(piece.index).file + i < 5) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (indexToSquare(piece.index).file - i > -1) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (indexToSquare(piece.index).rank + i < 5) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (indexToSquare(piece.index).rank - i > -1) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (indexToSquare(piece.index).level + i < 5) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }

    for (let i = 1; i < 5; i += 1) {
      if (indexToSquare(piece.index).level - i > -1) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
  } else if (piece.type === pieces.WB || piece.type === pieces.BB) {
    // x and y axis movements
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).rank + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).rank - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).rank + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).rank - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    // x and z axis movements
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
    // y and z axis movements
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).rank + i < 5 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).rank + i < 5 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).rank - i > -1 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).rank - i > -1 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
  } else if (piece.type === pieces.WN || piece.type === pieces.BN) {
    // x-2 and y-1 axis movements/
    if (
      indexToSquare(piece.index).file + 2 < 5 &&
      indexToSquare(piece.index).rank + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 2,
            indexToSquare(piece.index).rank + 1,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file + 2 < 5 &&
      indexToSquare(piece.index).rank - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 2,
            indexToSquare(piece.index).rank - 1,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 2 > -1 &&
      indexToSquare(piece.index).rank + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 2,
            indexToSquare(piece.index).rank + 1,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 2 > -1 &&
      indexToSquare(piece.index).rank - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 2,
            indexToSquare(piece.index).rank - 1,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    // x-1 and y-2 axis movements
    if (
      indexToSquare(piece.index).file + 1 < 5 &&
      indexToSquare(piece.index).rank + 2 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 1,
            indexToSquare(piece.index).rank + 2,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file + 1 < 5 &&
      indexToSquare(piece.index).rank - 2 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 1,
            indexToSquare(piece.index).rank - 2,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 1 > -1 &&
      indexToSquare(piece.index).rank + 2 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 1,
            indexToSquare(piece.index).rank + 2,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 1 > -1 &&
      indexToSquare(piece.index).rank - 2 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 1,
            indexToSquare(piece.index).rank - 2,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    // x-2 and z-1 axis movements
    if (
      indexToSquare(piece.index).file + 2 < 5 &&
      indexToSquare(piece.index).level + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 2,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level + 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file + 2 < 5 &&
      indexToSquare(piece.index).level - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 2,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level - 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 2 > -1 &&
      indexToSquare(piece.index).level + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 2,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level + 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 2 > -1 &&
      indexToSquare(piece.index).level - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 2,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level - 1
          )
        )
      );
    }
    // x-1 and z-2 axis movements
    if (
      indexToSquare(piece.index).file + 1 < 5 &&
      indexToSquare(piece.index).level + 2 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 1,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level + 2
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file + 1 < 5 &&
      indexToSquare(piece.index).level - 2 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 1,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level - 2
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 1 > -1 &&
      indexToSquare(piece.index).level + 2 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 1,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level + 2
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 1 > -1 &&
      indexToSquare(piece.index).level - 2 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 1,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level - 2
          )
        )
      );
    }
    // y-2 and z-1 axis movements
    if (
      indexToSquare(piece.index).rank + 2 < 5 &&
      indexToSquare(piece.index).level + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank + 2,
            indexToSquare(piece.index).level + 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).rank + 2 < 5 &&
      indexToSquare(piece.index).level - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank + 2,
            indexToSquare(piece.index).level - 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).rank - 2 > -1 &&
      indexToSquare(piece.index).level + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank - 2,
            indexToSquare(piece.index).level + 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).rank - 2 > -1 &&
      indexToSquare(piece.index).level - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank - 2,
            indexToSquare(piece.index).level - 1
          )
        )
      );
    }
    // y-1 and z-2 axis movements
    if (
      indexToSquare(piece.index).rank + 1 < 5 &&
      indexToSquare(piece.index).level + 2 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank + 1,
            indexToSquare(piece.index).level + 2
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).rank + 1 < 5 &&
      indexToSquare(piece.index).level - 2 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank + 1,
            indexToSquare(piece.index).level - 2
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).rank - 1 > -1 &&
      indexToSquare(piece.index).level + 2 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank - 1,
            indexToSquare(piece.index).level + 2
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).rank - 1 > -1 &&
      indexToSquare(piece.index).level - 2 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank - 1,
            indexToSquare(piece.index).level - 2
          )
        )
      );
    }
  } else if (piece.type === pieces.WU || piece.type === pieces.BU) {
    // x-y-z axis movements

    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).rank + i < 5 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).rank + i < 5 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).rank - i > -1 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).rank + i < 5 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).rank - i > -1 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).rank + i < 5 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).rank - i > -1 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).rank - i > -1 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
  } else if (piece.type === pieces.WQ || piece.type === pieces.BQ) {
    for (let i = 1; i < 5; i += 1) {
      if (indexToSquare(piece.index).file + i < 5) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (indexToSquare(piece.index).file - i > -1) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (indexToSquare(piece.index).rank + i < 5) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (indexToSquare(piece.index).rank - i > -1) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (indexToSquare(piece.index).level + i < 5) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }

    for (let i = 1; i < 5; i += 1) {
      if (indexToSquare(piece.index).level - i > -1) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
    // x and y axis movements
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).rank + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).rank - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).rank + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).rank - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level
            )
          )
        );
      }
    }
    // x and z axis movements
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
    // y and z axis movements
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).rank + i < 5 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).rank + i < 5 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).rank - i > -1 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).rank - i > -1 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).rank + i < 5 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).rank + i < 5 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).rank - i > -1 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).rank + i < 5 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file + i < 5 &&
        indexToSquare(piece.index).rank - i > -1 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file + i,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).rank + i < 5 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank + i,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).rank - i > -1 &&
        indexToSquare(piece.index).level + i < 5
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level + i
            )
          )
        );
      }
    }
    for (let i = 1; i < 5; i += 1) {
      if (
        indexToSquare(piece.index).file - i > -1 &&
        indexToSquare(piece.index).rank - i > -1 &&
        indexToSquare(piece.index).level - i > -1
      ) {
        movesList.push(
          new Move(
            piece.index,
            squareToIndex(
              indexToSquare(piece.index).file - i,
              indexToSquare(piece.index).rank - i,
              indexToSquare(piece.index).level - i
            )
          )
        );
      }
    }
  } else if (piece.type === pieces.WK || piece.type === pieces.BK) {
    if (indexToSquare(piece.index).file + 1 < 5) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 1,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (indexToSquare(piece.index).file - 1 > -1) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 1,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (indexToSquare(piece.index).rank + 1 < 5) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank + 1,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (indexToSquare(piece.index).rank - 1 > -1) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank - 1,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (indexToSquare(piece.index).level + 1 < 5) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level + 1
          )
        )
      );
    }

    if (indexToSquare(piece.index).level - 1 > -1) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level - 1
          )
        )
      );
    }
    // x and y axis movements
    if (
      indexToSquare(piece.index).file + 1 < 5 &&
      indexToSquare(piece.index).rank + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 1,
            indexToSquare(piece.index).rank + 1,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file + 1 < 5 &&
      indexToSquare(piece.index).rank - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 1,
            indexToSquare(piece.index).rank - 1,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 1 > -1 &&
      indexToSquare(piece.index).rank + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 1,
            indexToSquare(piece.index).rank + 1,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 1 > -1 &&
      indexToSquare(piece.index).rank - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 1,
            indexToSquare(piece.index).rank - 1,
            indexToSquare(piece.index).level
          )
        )
      );
    }
    // x and z axis movements
    if (
      indexToSquare(piece.index).file + 1 < 5 &&
      indexToSquare(piece.index).level + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 1,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level + 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file + 1 < 5 &&
      indexToSquare(piece.index).level - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 1,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level - 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 1 > -1 &&
      indexToSquare(piece.index).level + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 1,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level + 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 1 > -1 &&
      indexToSquare(piece.index).level - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 1,
            indexToSquare(piece.index).rank,
            indexToSquare(piece.index).level - 1
          )
        )
      );
    }
    // y and z axis movements
    if (
      indexToSquare(piece.index).rank + 1 < 5 &&
      indexToSquare(piece.index).level + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank + 1,
            indexToSquare(piece.index).level + 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).rank + 1 < 5 &&
      indexToSquare(piece.index).level - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank + 1,
            indexToSquare(piece.index).level - 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).rank - 1 > -1 &&
      indexToSquare(piece.index).level + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank - 1,
            indexToSquare(piece.index).level + 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).rank - 1 > -1 &&
      indexToSquare(piece.index).level - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file,
            indexToSquare(piece.index).rank - 1,
            indexToSquare(piece.index).level - 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file + 1 < 5 &&
      indexToSquare(piece.index).rank + 1 < 5 &&
      indexToSquare(piece.index).level + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 1,
            indexToSquare(piece.index).rank + 1,
            indexToSquare(piece.index).level + 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file + 1 < 5 &&
      indexToSquare(piece.index).rank + 1 < 5 &&
      indexToSquare(piece.index).level - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 1,
            indexToSquare(piece.index).rank + 1,
            indexToSquare(piece.index).level - 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file + 1 < 5 &&
      indexToSquare(piece.index).rank - 1 > -1 &&
      indexToSquare(piece.index).level + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 1,
            indexToSquare(piece.index).rank - 1,
            indexToSquare(piece.index).level + 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 1 > -1 &&
      indexToSquare(piece.index).rank + 1 < 5 &&
      indexToSquare(piece.index).level + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 1,
            indexToSquare(piece.index).rank + 1,
            indexToSquare(piece.index).level + 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file + 1 < 5 &&
      indexToSquare(piece.index).rank - 1 > -1 &&
      indexToSquare(piece.index).level - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file + 1,
            indexToSquare(piece.index).rank - 1,
            indexToSquare(piece.index).level - 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 1 > -1 &&
      indexToSquare(piece.index).rank + 1 < 5 &&
      indexToSquare(piece.index).level - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 1,
            indexToSquare(piece.index).rank + 1,
            indexToSquare(piece.index).level - 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 1 > -1 &&
      indexToSquare(piece.index).rank - 1 > -1 &&
      indexToSquare(piece.index).level + 1 < 5
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 1,
            indexToSquare(piece.index).rank - 1,
            indexToSquare(piece.index).level + 1
          )
        )
      );
    }
    if (
      indexToSquare(piece.index).file - 1 > -1 &&
      indexToSquare(piece.index).rank - 1 > -1 &&
      indexToSquare(piece.index).level - 1 > -1
    ) {
      movesList.push(
        new Move(
          piece.index,
          squareToIndex(
            indexToSquare(piece.index).file - 1,
            indexToSquare(piece.index).rank - 1,
            indexToSquare(piece.index).level - 1
          )
        )
      );
    }
  }
  return movesList;
};
export const legalMoves = async (board, piece) => {
  const movesList = await allMoves(piece);
  const illegalMovesList = [];
  let vectorX;
  let vectorY;
  let vectorZ;
  if (piece.type === pieces.BP) {
    for (let j = 0; j < movesList.length; j += 1) {
      // eslint-disable-next-line guard-for-in
      for (let i = 0; i < board.length; i += 1) {
        if (i === movesList[j].to && board[i] !== 0) {
          const index = illegalMovesList.findIndex(
            // eslint-disable-next-line no-loop-func
            (move) => move === movesList[j]
          );
          if (index === -1) illegalMovesList.push(movesList[j]);
        }
      }
    }
    for (let i = 0; i < board.length; i += 1) {
      if (
        indexToSquare(piece.index).file - 1 > -1 &&
        indexToSquare(piece.index).rank - 1 > -1 &&
        ((indexToSquare(i).file === indexToSquare(piece.index).file - 1 &&
          indexToSquare(i).rank === indexToSquare(piece.index).rank - 1 &&
          indexToSquare(i).level === indexToSquare(piece.index).level) ||
          (indexToSquare(i).file === indexToSquare(piece.index).file + 1 &&
            indexToSquare(i).rank === indexToSquare(piece.index).rank - 1 &&
            indexToSquare(i).level === indexToSquare(piece.index).level) ||
          (indexToSquare(i).file === indexToSquare(piece.index).file &&
            indexToSquare(i).rank === indexToSquare(piece.index).rank - 1 &&
            indexToSquare(i).level === indexToSquare(piece.index).level - 1) ||
          (indexToSquare(i).file === indexToSquare(piece.index).file + 1 &&
            indexToSquare(i).rank === indexToSquare(piece.index).rank &&
            indexToSquare(i).level === indexToSquare(piece.index).level - 1) ||
          (indexToSquare(i).file === indexToSquare(piece.index).file - 1 &&
            indexToSquare(i).rank === indexToSquare(piece.index).rank &&
            indexToSquare(i).level === indexToSquare(piece.index).level - 1)) &&
        board[i] > 0
      ) {
        movesList.push(new Move(piece.index, i, "Capture"));
      }
    }
  } else if (piece.type === pieces.WP) {
    for (let j = 0; j < movesList.length; j += 1) {
      // eslint-disable-next-line guard-for-in
      for (let i = 0; i < board.length; i += 1) {
        if (i === movesList[j].to && board[i] !== 0) {
          const index = illegalMovesList.findIndex(
            // eslint-disable-next-line no-loop-func
            (move) => move === movesList[j]
          );
          if (index === -1) illegalMovesList.push(movesList[j]);
        }
      }
    }
    for (let i = 0; i < board.length; i += 1) {
      if (
        indexToSquare(piece.index).file - 1 > -1 &&
        indexToSquare(piece.index).rank + 1 < 5 &&
        ((indexToSquare(i).file === indexToSquare(piece.index).file - 1 &&
          indexToSquare(i).rank === indexToSquare(piece.index).rank + 1 &&
          indexToSquare(i).level === indexToSquare(piece.index).level) ||
          (indexToSquare(i).file === indexToSquare(piece.index).file + 1 &&
            indexToSquare(i).rank === indexToSquare(piece.index).rank + 1 &&
            indexToSquare(i).level === indexToSquare(piece.index).level) ||
          (indexToSquare(i).file === indexToSquare(piece.index).file &&
            indexToSquare(i).rank === indexToSquare(piece.index).rank + 1 &&
            indexToSquare(i).level === indexToSquare(piece.index).level + 1) ||
          (indexToSquare(i).file === indexToSquare(piece.index).file + 1 &&
            indexToSquare(i).rank === indexToSquare(piece.index).rank &&
            indexToSquare(i).level === indexToSquare(piece.index).level + 1) ||
          (indexToSquare(i).file === indexToSquare(piece.index).file - 1 &&
            indexToSquare(i).rank === indexToSquare(piece.index).rank &&
            indexToSquare(i).level === indexToSquare(piece.index).level + 1)) &&
        board[i] < 0
      ) {
        movesList.push(new Move(piece.index, i, "Capture"));
      }
    }
  } else if (piece.type === pieces.WN || piece.type === pieces.BN) {
    for (let j = 0; j < movesList.length; j += 1) {
      // eslint-disable-next-line guard-for-in
      for (let i = 0; i < board.length; i += 1) {
        if (i === movesList[j].to) {
          if (Math.sign(board[i]) === Math.sign(piece.type)) {
            const index = illegalMovesList.findIndex(
              // eslint-disable-next-line no-loop-func
              (move) => move === movesList[j]
            );
            if (index === -1) illegalMovesList.push(movesList[j]);
          } else if (
            Math.sign(board[i]) !== 0 &&
            Math.sign(board[i]) !== Math.sign(piece.type)
          ) {
            movesList[j].type = "Capture";
          }
        }
      }
    }
  } else {
    for (let j = 0; j < movesList.length; j += 1) {
      // eslint-disable-next-line guard-for-in
      for (let i = 0; i < board.length; i += 1) {
        if (
          i === movesList[j].to &&
          Math.sign(board[i]) === Math.sign(piece.type)
        ) {
          vectorX =
            indexToSquare(movesList[j].to).file -
            indexToSquare(piece.index).file;
          vectorY =
            indexToSquare(movesList[j].to).rank -
            indexToSquare(piece.index).rank;
          vectorZ =
            indexToSquare(movesList[j].to).level -
            indexToSquare(piece.index).level;

          if (vectorX !== 0) vectorX /= Math.abs(vectorX);
          if (vectorY !== 0) vectorY /= Math.abs(vectorY);
          if (vectorZ !== 0) vectorZ /= Math.abs(vectorZ);
          for (
            let k = indexToSquare(movesList[j].to).file,
              l = indexToSquare(movesList[j].to).rank,
              m = indexToSquare(movesList[j].to).level;
            k < 5 && k > -1 && l < 5 && l > -1 && m < 5 && m > -1;
            k += vectorX, l += vectorY, m += vectorZ
          ) {
            for (let n = 0; n < movesList.length; n += 1) {
              if (
                k === indexToSquare(movesList[n].to).file &&
                l === indexToSquare(movesList[n].to).rank &&
                m === indexToSquare(movesList[n].to).level
              ) {
                const index = illegalMovesList.findIndex(
                  (x) => x === movesList[n]
                );
                if (index === -1) illegalMovesList.push(movesList[n]);
              }
            }
          }
        } else if (
          indexToSquare(i).file === indexToSquare(movesList[j].to).file &&
          indexToSquare(i).rank === indexToSquare(movesList[j].to).rank &&
          indexToSquare(i).level === indexToSquare(movesList[j].to).level &&
          Math.sign(board[i]) !== 0 &&
          Math.sign(board[i]) !== Math.sign(piece.type)
        ) {
          movesList[j].type = "Capture";
          vectorX =
            indexToSquare(movesList[j].to).file -
            indexToSquare(piece.index).file;
          vectorY =
            indexToSquare(movesList[j].to).rank -
            indexToSquare(piece.index).rank;
          vectorZ =
            indexToSquare(movesList[j].to).level -
            indexToSquare(piece.index).level;

          if (vectorX !== 0) vectorX /= Math.abs(vectorX);
          if (vectorY !== 0) vectorY /= Math.abs(vectorY);
          if (vectorZ !== 0) vectorZ /= Math.abs(vectorZ);
          for (
            let k = indexToSquare(movesList[j].to).file + vectorX,
              l = indexToSquare(movesList[j].to).rank + vectorY,
              m = indexToSquare(movesList[j].to).level + vectorZ;
            k < 5 && k > -1 && l < 5 && l > -1 && m < 5 && m > -1;
            k += vectorX, l += vectorY, m += vectorZ
          ) {
            for (let n = 0; n < movesList.length; n += 1) {
              if (
                k === indexToSquare(movesList[n].to).file &&
                l === indexToSquare(movesList[n].to).rank &&
                m === indexToSquare(movesList[n].to).level
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
    }
  }
  return onlyInFirst(movesList, illegalMovesList);
};
export const afterMove = async (move, board) => {
  // eslint-disable-next-line prefer-object-spread
  const newBoard = new Int8Array(125);
  for (let i = 0; i < newBoard.length; i += 1) {
    newBoard[i] = board[i];
  }
  const piece = board[move.from];
  newBoard[move.from] = pieces.EMPTY;
  newBoard[move.to] = piece;
  return newBoard;
};
export const isCheck = async (board, king) => {
  let isInCheck = false;
  for (let i = 0; i < board.length; i += 1) {
    if (board[i] !== 0 && Math.sign(board[i]) !== king.color) {
      const movesList = await legalMoves(board, { type: board[i], index: i });
      for (let j = 0; j < movesList.length; j += 1) {
        if (movesList[j].to === king.index) {
          isInCheck = true;
          break;
        }
      }
    }
  }
  return isInCheck;
};
export const inCheckMoves = async (board, piece) => {
  const legalMovesList = await legalMoves(board, piece);
  const resultList = [];

  for (let i = 0; i < legalMovesList.length; i += 1) {
    let king;
    const newBoard = await afterMove(legalMovesList[i], board);
    if (piece.type < 0) {
      king = { index: newBoard.findIndex((x) => x === pieces.BK), color: -1 };
    } else {
      king = { index: newBoard.findIndex((x) => x === pieces.WK), color: 1 };
    }
    if (
      (await isCheck(await afterMove(legalMovesList[i], board), king)) === false
    ) {
      resultList.push(legalMovesList[i]);
    }
  }
  return resultList;
};
export const finalMoves = async (board, piece) => {
  const legalMovesList = await legalMoves(board, piece);
  let resultList = [];
  let king;
  if (piece.type < 0) {
    king = { index: board.findIndex((x) => x === pieces.BK), color: -1 };
  } else {
    king = { index: board.findIndex((x) => x === pieces.WK), color: 1 };
  }
  if ((await isCheck(board, king)) === true) {
    resultList = inCheckMoves(board, piece);
  } else {
    for (const i in legalMovesList) {
      if (piece.type < 0) {
        king = {
          index: (await afterMove(legalMovesList[i], board)).findIndex(
            (x) => x === pieces.BK
          ),
          color: -1,
        };
      } else {
        king = {
          index: (await afterMove(legalMovesList[i], board)).findIndex(
            (x) => x === pieces.WK
          ),
          color: 1,
        };
      }
      if (
        (await isCheck(await afterMove(legalMovesList[i], board), king)) ===
        false
      ) {
        resultList.push(legalMovesList[i]);
      }
    }
  }
  return resultList;
};
export const checkMate = async (board) => {
  let isCheckMate = false;
  const BK = { index: board.findIndex((x) => x === pieces.BK), color: -1 };
  const WK = { index: board.findIndex((x) => x === pieces.WK), color: 1 };
  if ((await isCheck(board, BK)) === true) {
    isCheckMate = "White won by checkmate";
    for (let i = 0; i < board.length; i += 1) {
      if (
        board[i] < 0 &&
        (await inCheckMoves(board, { index: i, type: board[i] })).length !== 0
      ) {
        isCheckMate = false;
        break;
      }
    }
  } else if ((await isCheck(board, WK)) === true) {
    isCheckMate = "Black won by checkmate";
    for (let i = 0; i < board.length; i += 1) {
      if (
        board[i] > 0 &&
        (await inCheckMoves(board, { index: i, type: board[i] })).length !== 0
      ) {
        isCheckMate = false;
        break;
      }
    }
  }
  return isCheckMate;
};
