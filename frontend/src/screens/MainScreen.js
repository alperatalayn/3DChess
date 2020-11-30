/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import io from "socket.io-client";
import { initialState } from "../config";
import {
  getGameState,
  getUserInfo,
  setGameState,
  setRoom,
  getRoom,
  setColor,
  getColor,
  setNextToMove,
  getNextToMove,
} from "../localStorage";
import { checkMate, finalMoves, getPieceFromState } from "../moves";

let turn = getNextToMove();
let GameState = getGameState();
const socket = io("http://localhost:5000");
const pi = 3.1415;
let pieceToMove = null;
socket.on("game started", async (data) => {
  turn = "White";
  setNextToMove(turn);
  setRoom(data.room);
  setColor(data.color);
  console.log(getRoom());
  setGameState(initialState);
  GameState = getGameState();
});

const gameEnded = (reason) => {
  alert(`${reason}game ended`);
  document.location.hash = "/#/";
};

socket.on("game ended", (data) => {
  gameEnded(data);
});
socket.on("checkmate", (data) => {
  gameEnded(data);
});
const player = getColor();
export const connect = () => {
  const userInfo = getUserInfo();
  io.connect({
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: 10,
  });
  socket.emit("userconnected", { user: userInfo, room: getRoom() });
};

export const sendMoveToServer = async (roomToSend, movedPiece, pickInfo) => {
  let nextToMove;
  if (turn === "White") {
    nextToMove = "Black";
  } else {
    nextToMove = "White";
  }
  socket.emit("sendMove", {
    turn: nextToMove,
    room: roomToSend,
    piece: movedPiece,
    position: pickInfo.pickedMesh.position,
  });
};

const getMoves = async (pickInfo) => {
  const movesList = await finalMoves(
    GameState,
    getPieceFromState(GameState, {
      x: pickInfo.pickedMesh.position.x,
      y: pickInfo.pickedMesh.position.y,
      z: pickInfo.pickedMesh.position.z / 2,
    })
  );
  return movesList;
};

const deletePieceFromState = async (pieceInput, scene) => {
  scene
    .getMeshByName(getKeyByValue(GameState, pieceInput.coordinates))
    .dispose();
  for (const piece in GameState) {
    if (GameState[piece] === pieceInput && GameState[piece].type !== "King") {
      delete GameState[piece];
    }
  }
  return "Not Found";
};
const getKeyByValue = (object, coordinates) => {
  return Object.keys(object).find(
    (key) =>
      object[key].coordinates.x === coordinates.x &&
      object[key].coordinates.y === coordinates.y &&
      object[key].coordinates.z === coordinates.z
  );
};

const createScene = async () => {
  const canvas = document.getElementById("renderCanvas"); // Get the canvas element
  const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
  // eslint-disable-next-line no-unused-vars
  const scene = new BABYLON.Scene(engine);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(-1, -1, 1)
  );
  light.intensity = 0.6;
  // eslint-disable-next-line no-unused-vars
  const ThreeDBoard = Array(5);
  for (let index = 0; index < ThreeDBoard.length; index += 1) {
    ThreeDBoard[index] = Array(5);
  }
  for (let i = 0; i < ThreeDBoard.length; i += 1) {
    for (let j = 0; j < ThreeDBoard.length; j += 1) {
      ThreeDBoard[i][j] = Array(5);
    }
  }

  const f = new BABYLON.Vector4(0.5, 0, 1, 1);
  const b = new BABYLON.Vector4(0, 0, 0.5, 1);
  const whiteMaterial = new BABYLON.StandardMaterial("white", scene);
  const brownMaterial = new BABYLON.StandardMaterial("brown", scene);
  const redMaterial = new BABYLON.StandardMaterial("red", scene);
  const greenMaterial = new BABYLON.StandardMaterial("green", scene);
  whiteMaterial.diffuseTexture = new BABYLON.Texture(
    "/images/white.png",
    scene
  );
  brownMaterial.diffuseTexture = new BABYLON.Texture(
    "/images/brown.png",
    scene
  );
  redMaterial.diffuseTexture = new BABYLON.Texture("/images/red.png", scene);
  greenMaterial.diffuseTexture = new BABYLON.Texture(
    "/images/green.png",
    scene
  );

  for (let i = 0; i < 5; i += 1)
    for (let j = 0; j < 5; j += 1)
      for (let k = 0; k < 5; k += 1) {
        ThreeDBoard[i][j][k] = BABYLON.MeshBuilder.CreateBox("box1", {
          size: 1,
          depth: 0.1,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          frontUVs: f,
          backUVs: b,
        });
        ThreeDBoard[i][j][k].freezeWorldMatrix();
        ThreeDBoard[i][j][k].position = new BABYLON.Vector3(i, j, k * 2);
        if ((j + k + i) % 2 === 1) {
          ThreeDBoard[i][j][k].material = brownMaterial;
        } else {
          ThreeDBoard[i][j][k].material = whiteMaterial;
        }
      }
  const camera = new BABYLON.ArcRotateCamera(
    "cam",
    pi / 2,
    2.8,
    15,
    ThreeDBoard[2][2][2],
    scene,
    true
  );

  camera.attachControl(canvas, true);
  camera.mode = BABYLON.Camera.PERSPECTIVE_CAMERA;
  camera.lowerAlphaLimit = pi / 3;
  camera.upperAlphaLimit = (2 * pi) / 3;

  camera.lowerBetaLimit = pi / 2;
  camera.upperBetaLimit = pi;
  camera.lowerRadiusLimit = 12.5;
  camera.upperRadiusLimit = 22.5;

  const camera1 = new BABYLON.ArcRotateCamera(
    "cam",
    pi / 2,
    2.8,
    15,
    ThreeDBoard[2][2][2],
    scene,
    true
  );
  camera1.attachControl(canvas, true);
  camera1.mode = BABYLON.Camera.PERSPECTIVE_CAMERA;
  camera1.lowerAlphaLimit = pi + pi / 3;
  camera1.upperAlphaLimit = pi + (2 * pi) / 3;

  camera1.lowerBetaLimit = -pi / 2;
  camera1.upperBetaLimit = 0;
  camera1.lowerRadiusLimit = 12.5;
  camera1.upperRadiusLimit = 22.5;
  for (const piece in GameState) {
    const p = BABYLON.SceneLoader.ImportMeshAsync(
      null,
      "/obj/",
      GameState[piece].obj,
      scene
    );
    (await p).meshes[0].position = new BABYLON.Vector3(
      GameState[piece].coordinates.x,
      GameState[piece].coordinates.y,
      GameState[piece].coordinates.z * 2
    );
    (await p).meshes[0].rotation = new BABYLON.Vector3(pi / 2, 0, 0);
    if (GameState[piece].color === "White")
      (await p).meshes[0].material = whiteMaterial;
    else if (GameState[piece].color === "Black")
      (await p).meshes[0].material = brownMaterial;
    (await p).meshes[0].type = GameState[piece].type;
    (await p).meshes[0].color = GameState[piece].color;
    (await p).meshes[0].name = piece;
    (await p).meshes[0].status = "";
  }
  const setBoard = (movesList, pickInfo) => {
    for (let i = 0; i < movesList.length; i += 1) {
      if (movesList[i].type === "") {
        ThreeDBoard[movesList[i].x][movesList[i].y][
          movesList[i].z
        ].material = greenMaterial;
        ThreeDBoard[movesList[i].x][movesList[i].y][movesList[i].z].status =
          "moveable";
      } else if (movesList[i].type === "Capture") {
        ThreeDBoard[movesList[i].x][movesList[i].y][
          movesList[i].z
        ].material = redMaterial;
        ThreeDBoard[movesList[i].x][movesList[i].y][movesList[i].z].status =
          "can-capture";
        scene.getMeshByName(
          getKeyByValue(GameState, {
            x: movesList[i].x,
            y: movesList[i].y,
            z: movesList[i].z,
          })
        ).status = "can-capture";
      }
    }
    pieceToMove = pickInfo.pickedMesh;
  };
  const setBoardDefault = async () => {
    for (let i = 0; i < 5; i += 1)
      for (let j = 0; j < 5; j += 1)
        for (let k = 0; k < 5; k += 1) {
          if ((j + k + i) % 2 === 1) {
            ThreeDBoard[i][j][k].material = brownMaterial;
          } else {
            ThreeDBoard[i][j][k].material = whiteMaterial;
          }
        }
    for (const i in scene.meshes) {
      scene.meshes[i].status = "";
    }
    pieceToMove = null;
  };
  scene.onPointerDown = async (evt, pickInfo) => {
    if (pickInfo.hit) {
      if (
        pickInfo.pickedMesh.type &&
        pieceToMove === null &&
        pickInfo.pickedMesh.color === player &&
        pickInfo.pickedMesh.status === ""
      ) {
        const movesList = await getMoves(pickInfo);
        setBoard(movesList, pickInfo);
      } else if (
        (pickInfo.pickedMesh.status === "moveable" && turn === player) ||
        (pickInfo.pickedMesh.status === "can-capture" && turn === player)
      ) {
        const movedPiece = pieceToMove.name;
        const roomToSend = getRoom();
        console.log(roomToSend);
        await sendMoveToServer(roomToSend, movedPiece, pickInfo);
      } else {
        await setBoardDefault();
      }
    }
  };

  socket.on("getMove", async (data) => {
    for (const i in GameState) {
      if (
        GameState[i].coordinates.x === data.position._x &&
        GameState[i].coordinates.y === data.position._y &&
        GameState[i].coordinates.z === data.position._z / 2
      ) {
        await deletePieceFromState(GameState[i], scene);
      }
    }
    GameState[data.piece].coordinates.x = data.position._x;
    GameState[data.piece].coordinates.y = data.position._y;
    GameState[data.piece].coordinates.z = data.position._z / 2;
    scene.getMeshByName(data.piece).position.x = data.position._x;
    scene.getMeshByName(data.piece).position.y = data.position._y;
    scene.getMeshByName(data.piece).position.z = data.position._z;
    setGameState(GameState);
    await setBoardDefault();
    turn = data.turn;
    setNextToMove(turn);
    if ((await checkMate(GameState)) !== false) {
      socket.emit("checkmate", await checkMate(GameState));
    }
  });
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  if (player === "Black") scene.activeCamera = camera1;
  else scene.activeCamera = camera;
  console.log(camera.position);
  return scene;
};

const animateScene = async () => {
  const newScene = await createScene();
  const engine = newScene.getEngine();
  engine.runRenderLoop(() => {
    newScene.render();
  });
  window.addEventListener("resize", () => {
    engine.resize();
  });
  return newScene;
};

const MainScreen = {
  after_render: async () => {
    await animateScene();
  },
  render: async () => {
    connect();
    return `<div>
    <canvas id="renderCanvas" touch-action="none"></canvas>
    <button id="MoveButton"> Move </button>
    </div>`;
  },
};
export default MainScreen;
