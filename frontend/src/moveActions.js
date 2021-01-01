/* eslint-disable no-param-reassign */
export const setBoard = async (moveList, ThreeDBoard, scene) => {
  for (let i = 0; i < moveList.length; i += 1) {
    const move = moveList[i];
    const moveDest = document.getElementById(move.to);
    moveDest._move = move;
    ThreeDBoard[move.to].move = move;
    if (move.type === "Capture") {
      scene.getMeshByName(move.to.toString()).move = move;
      ThreeDBoard[move.to].material = scene.getMaterialByName("red");
      if (move.to % 2 !== 0) {
        moveDest.classList.replace("light", "move-dest-kill");
      } else {
        moveDest.classList.replace("dark", "move-dest-kill");
      }
    } else {
      ThreeDBoard[move.to].material = scene.getMaterialByName("green");
      if (move.to % 2 !== 0) {
        moveDest.classList.replace("light", "move-dest-light");
      } else {
        moveDest.classList.replace("dark", "move-dest-dark");
      }
    }
  }
};
export const resetBoard = async (ThreeDBoard, scene) => {
  for (let i = 0; i < ThreeDBoard.length; i += 1) {
    const moveDest = document.getElementById(i);
    if (scene.getMeshByName(i.toString()))
      scene.getMeshByName(i.toString()).move = null;
    if (moveDest._move) {
      moveDest._move = null;
    }
    ThreeDBoard[i].move = null;
    if (i % 2 === 1) {
      ThreeDBoard[i].material = scene.getMaterialByName("white");
      document.getElementById(i).classList.replace("move-dest-kill", "light");
      document.getElementById(i).classList.replace("move-dest-light", "light");
    } else {
      ThreeDBoard[i].material = scene.getMaterialByName("brown");
      document.getElementById(i).classList.replace("move-dest-kill", "dark");
      document.getElementById(i).classList.replace("move-dest-dark", "dark");
    }
  }
};
