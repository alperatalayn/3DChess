/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { sendMoveToServer, socket } from "../api";
import twoDBoards from "../components/TwoDBoards";
import { indexToSquare, pieces } from "../config";
import {
  clearGame,
  getColor,
  getGameState,
  getNextToMove,
  getNotation,
  getRoom,
  setGameState,
  setNextToMove,
  setNotation,
} from "../localStorage";
import { notation } from "../notation";
import { checkMate, finalMoves } from "../moves";
import { resetBoard, setBoard } from "../moveActions";
import SideTable from "../components/SideTable";

const ThreeDBoard = Array(125);
let boardSetted = Boolean(false);
let currentNotation;
let turn;
let player;
let room;
let makeMove;
const gameEnded = (reason) => {
  alert(`${reason} game ended`);
  document.location.hash = "/";
  clearGame();
};
socket.on("timeupdate", (data) => {
  console.log(data);
});
socket.on("timeout", (data) => {
  socket.emit("finish", {
    room: getRoom(),
  });
  gameEnded(data);
});
socket.on("game ended", (data) => {
  gameEnded(data);
  socket.emit("finish", {
    room: getRoom(),
  });
});
socket.on("checkmate", (data) => {
  gameEnded(data.status);
});
socket.on("resign", (data) => {
  gameEnded(`${data.color} resigned`);
});
const meshNames = [
  "ChessPawn.obj",
  "ChessKnight.obj",
  "ChessBishop.obj",
  "ChessRook.obj",
  "ChessUnicorn.obj",
  "ChessQueen.obj",
  "ChessKing.obj",
];
const pi = 3.14;
let board = new Int8Array(125);

const deleteMesh = async (scene, name) => {
  scene.getMeshByName(name).dispose();
};

const createScene = async () => {
  makeMove = async (move) => {
    if (move.type === "Capture") {
      await deleteMesh(scene, move.to.toString());
    }
    const piece = board[move.from];
    let twoDAsset;
    switch (piece) {
      case pieces.WP:
        twoDAsset = "WhitePawn";
        break;
      case pieces.WN:
        twoDAsset = "WhiteKnight";
        break;
      case pieces.WB:
        twoDAsset = "WhiteBishop";
        break;
      case pieces.WR:
        twoDAsset = "WhiteRook";
        break;
      case pieces.WU:
        twoDAsset = "WhiteUnicorn";
        break;
      case pieces.WQ:
        twoDAsset = "WhiteQueen";
        break;
      case pieces.WK:
        twoDAsset = "WhiteKing";
        break;
      case pieces.BP:
        twoDAsset = "BlackPawn";
        break;
      case pieces.BN:
        twoDAsset = "BlackKnight";
        break;
      case pieces.BB:
        twoDAsset = "BlackBishop";
        break;
      case pieces.BR:
        twoDAsset = "BlackRook";
        break;
      case pieces.BU:
        twoDAsset = "BlackUnicorn";
        break;
      case pieces.BQ:
        twoDAsset = "BlackQueen";
        break;
      case pieces.BK:
        twoDAsset = "BlackKing";
        break;

      default:
        break;
    }
    const fromSquare = document.getElementById(move.from);
    const toSquare = document.getElementById(move.to);
    const mesh = scene.getMeshByName(move.from.toString());
    mesh.position.x = indexToSquare(move.to).file;
    mesh.position.y = indexToSquare(move.to).rank;
    mesh.position.z = indexToSquare(move.to).level * 2;
    mesh.name = move.to.toString();
    fromSquare.innerHTML = ``;
    toSquare.innerHTML = `<img src="/images/pieces/${twoDAsset}.png"/>`;
    board[move.from] = 0;
    board[move.to] = piece;
    setGameState(board);
    currentNotation = notation(currentNotation, piece, move);
    setNotation(currentNotation);
    turn *= -1;
    setNextToMove(turn);
    const isCheckMate = await checkMate(board);
    if (isCheckMate && player === 1) {
      socket.emit("checkmate", { status: isCheckMate });
    }
    await SideTable.updatenotation();
  };
  const canvas = document.getElementById("renderCanvas");
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(-1, -1, 1)
  );
  light.intensity = 0.6;
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
  for (let i = 0; i < 125; i += 1) {
    ThreeDBoard[i] = BABYLON.MeshBuilder.CreateBox("box1", {
      size: 1,
      depth: 0.1,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
      frontUVs: f,
      backUVs: b,
    });
    ThreeDBoard[i].freezeWorldMatrix();
    ThreeDBoard[i].move = null;
    ThreeDBoard[i].position = new BABYLON.Vector3(
      indexToSquare(i).file,
      indexToSquare(i).rank,
      indexToSquare(i).level * 2
    );
    if (i % 2 === 1) {
      ThreeDBoard[i].material = whiteMaterial;
    } else {
      ThreeDBoard[i].material = brownMaterial;
    }
  }
  const camera = new BABYLON.ArcRotateCamera(
    "cam",
    pi / 2,
    2.8,
    15,
    ThreeDBoard[62],
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
    pi + pi / 2,
    2.8 - pi,
    15,
    ThreeDBoard[62],
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

  for (let i = 0; i < board.length; i += 1) {
    if (board[i] !== 0) {
      const p = BABYLON.SceneLoader.ImportMeshAsync(
        null,
        "/obj/",
        meshNames[Math.abs(board[i]) - 1],
        scene
      );
      const mesh = (await p).meshes[0];
      mesh.position = new BABYLON.Vector3(
        indexToSquare(i).file,
        indexToSquare(i).rank,
        indexToSquare(i).level * 2
      );

      mesh.name = i.toString();
      mesh.move = null;
      mesh.type = board[i];
      if (board[i] > 0) {
        mesh.rotation = new BABYLON.Vector3(pi / 2, 0, 0);
        mesh.material = whiteMaterial;
      } else if (board[i] < 0) {
        mesh.material = brownMaterial;
        mesh.rotation = new BABYLON.Vector3(pi / 2, 0, 0);
      }
    }
  }

  scene.onPointerDown = async (evt, pickInfo) => {
    if (pickInfo.pickedMesh) {
      if (
        pickInfo.pickedMesh.name &&
        Math.sign(board[pickInfo.pickedMesh.name]) === player &&
        boardSetted === false
      ) {
        await setBoard(
          await finalMoves(board, {
            type: board[pickInfo.pickedMesh.name],
            index: pickInfo.pickedMesh.name,
          }),
          ThreeDBoard,
          scene
        );
        boardSetted = true;
      } else if (pickInfo.pickedMesh.move !== null && turn === player) {
        await sendMoveToServer(pickInfo.pickedMesh.move, room, turn);
        await makeMove(pickInfo.pickedMesh.move, scene);
        await resetBoard(ThreeDBoard, scene);
        boardSetted = false;
      } else {
        await resetBoard(ThreeDBoard, scene);
        boardSetted = false;
      }
    }
  };
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  if (player === -1) scene.activeCamera = camera1;
  else scene.activeCamera = camera;

  socket.on("getMove", async (data) => {
    await makeMove(data.move, scene);
  });
  return scene;
};

const sortBoards = async () => {
  const parent = document.getElementById("two-d-boards");
  const children = parent.getElementsByClassName("unselected");
  const ids = [];
  let obj;
  let i;
  let len;
  for (i = 0, len = children.length; i < len; i += 1) {
    obj = {};
    obj.element = children[i];
    obj.idNum = parseInt(children[i].id.replace(/[^\d]/g, ""), 10);
    ids.push(obj);
  }
  ids.sort((a, b) => {
    return b.idNum - a.idNum;
  });
  const selected = document.getElementsByClassName("selected").item(0);
  for (i = 0; i < ids.length + 1; i += 1) {
    if (i === 0) parent.appendChild(selected);
    else parent.appendChild(ids[i - 1].element);
  }
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
const TestScreen = {
  after_render: async () => {
    document.getElementById("side-table").innerHTML = await SideTable.render();
    const scene = await animateScene();
    for (let i = 0; i < board.length; i += 1) {
      const square = document.getElementById(i);
      square.addEventListener("click", async () => {
        if (Math.sign(board[i]) === player && boardSetted === false) {
          await setBoard(
            await finalMoves(board, { type: board[i], index: i }),
            ThreeDBoard,
            scene
          );
          boardSetted = true;
        } else if (square._move && turn === player) {
          await sendMoveToServer(square._move, room, turn);
          await makeMove(square._move);
          await resetBoard(ThreeDBoard, scene);
          boardSetted = false;
        } else {
          await resetBoard(ThreeDBoard, scene);
          boardSetted = false;
        }
      });

      if (board[i] !== 0) {
        let piece;
        switch (board[i]) {
          case pieces.WP:
            piece = "WhitePawn";
            break;
          case pieces.WN:
            piece = "WhiteKnight";
            break;
          case pieces.WB:
            piece = "WhiteBishop";
            break;
          case pieces.WR:
            piece = "WhiteRook";
            break;
          case pieces.WU:
            piece = "WhiteUnicorn";
            break;
          case pieces.WQ:
            piece = "WhiteQueen";
            break;
          case pieces.WK:
            piece = "WhiteKing";
            break;
          case pieces.BP:
            piece = "BlackPawn";
            break;
          case pieces.BN:
            piece = "BlackKnight";
            break;
          case pieces.BB:
            piece = "BlackBishop";
            break;
          case pieces.BR:
            piece = "BlackRook";
            break;
          case pieces.BU:
            piece = "BlackUnicorn";
            break;
          case pieces.BQ:
            piece = "BlackQueen";
            break;
          case pieces.BK:
            piece = "BlackKing";
            break;

          default:
            break;
        }
        document.getElementById(
          i
        ).innerHTML = `<img src="/images/pieces/${piece}.png"/>`;
      }
    }
    const boardList = Array.from(document.getElementsByClassName("board"));
    boardList.forEach((element) => {
      element.addEventListener("dblclick", async function resize() {
        let selected = document.getElementsByClassName("selected").item(0);
        if (!selected) {
          element.classList.replace("unselected", "selected");
        } else if (element !== selected) {
          selected.classList.replace("selected", "unselected");
          element.classList.replace("unselected", "selected");
        }
        await sortBoards();
        selected = document.getElementsByClassName("selected").item(0);
      });
    });
  },
  render: async () => {
    board = Object.values(getGameState());
    turn = getNextToMove();
    player = getColor();
    console.log("turn: ", turn, "i am: ", player === -1 ? "Black" : "White");
    room = getRoom();
    currentNotation = getNotation();
    return `
    <div class="container-fluid">
      <div class ="row">
          <div class="col-md-5">
            <canvas id="renderCanvas" touch-action="none"></canvas>
          </div>
          <div class="col-md-3">
            <div id ="two-d-boards" class="two-d-boards">${twoDBoards}</div>
          </div>
          <div class="col-md-4">
            <div id="side-table"></div>  
          </div>
      </div>
    </div>
    `;
  },
};

export default TestScreen;
