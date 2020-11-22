/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { allMoves } from "../moves";
// import TwoDBoards from "../components/TwoDBoards";

class Piece {
  constructor(type, { x, y, z }, obj, color) {
    this.obj = obj;
    this.coordinates = { x, y, z };
    this.type = type;
    this.color = color;
  }
}
const deg = 1.5707;
let pieceToMove;
const GameRenderState = { p1: null, p2: null, p3: null, p4: null };
let GameState = Piece[40];
GameState = {
  p1: new Piece("WhitePawn", { x: 0, y: 1, z: 0 }, "ChessPawn.obj", "White"),
  p2: new Piece("WhitePawn", { x: 1, y: 1, z: 0 }, "ChessPawn.obj", "White"),
  p3: new Piece("WhitePawn", { x: 2, y: 1, z: 0 }, "ChessPawn.obj", "White"),
  p4: new Piece("WhitePawn", { x: 3, y: 1, z: 0 }, "ChessPawn.obj", "White"),
  p5: new Piece("WhitePawn", { x: 4, y: 1, z: 0 }, "ChessPawn.obj", "White"),
  p6: new Piece("WhitePawn", { x: 0, y: 1, z: 1 }, "ChessPawn.obj", "White"),
  p7: new Piece("WhitePawn", { x: 1, y: 1, z: 1 }, "ChessPawn.obj", "White"),
  p8: new Piece("WhitePawn", { x: 2, y: 1, z: 1 }, "ChessPawn.obj", "White"),
  p9: new Piece("WhitePawn", { x: 3, y: 1, z: 1 }, "ChessPawn.obj", "White"),
  p10: new Piece("WhitePawn", { x: 4, y: 1, z: 1 }, "ChessPawn.obj", "White"),
  wr1: new Piece("Rook", { x: 0, y: 0, z: 0 }, "ChessRook.obj", "White"),
  wn1: new Piece("Knight", { x: 1, y: 0, z: 0 }, "ChessKnight.obj", "White"),
  wk: new Piece("King", { x: 2, y: 0, z: 0 }, "ChessKing.obj", "White"),
  wn2: new Piece("Knight", { x: 3, y: 0, z: 0 }, "ChessKnight.obj", "White"),
  wr2: new Piece("Rook", { x: 4, y: 0, z: 0 }, "ChessRook.obj", "White"),
  wb1: new Piece("Bishop", { x: 0, y: 0, z: 1 }, "ChessBishop.obj", "White"),
  wu1: new Piece("Unicorn", { x: 1, y: 0, z: 1 }, "ChessUnicorn.obj", "White"),
  wq: new Piece("Queen", { x: 2, y: 0, z: 1 }, "ChessQueen.obj", "White"),
  wb2: new Piece("Bishop", { x: 3, y: 0, z: 1 }, "ChessBishop.obj", "White"),
  wu2: new Piece("Unicorn", { x: 4, y: 0, z: 1 }, "ChessUnicorn.obj", "White"),

  bp1: new Piece("BlackPawn", { x: 0, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  bp2: new Piece("BlackPawn", { x: 1, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  bp3: new Piece("BlackPawn", { x: 2, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  bp4: new Piece("BlackPawn", { x: 3, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  bp5: new Piece("BlackPawn", { x: 4, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  bp6: new Piece("BlackPawn", { x: 0, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  bp7: new Piece("BlackPawn", { x: 1, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  bp8: new Piece("BlackPawn", { x: 2, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  bp9: new Piece("BlackPawn", { x: 3, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  bp10: new Piece("BlackPawn", { x: 4, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  br1: new Piece("Rook", { x: 0, y: 4, z: 4 }, "ChessRook.obj", "Black"),
  bn1: new Piece("Knight", { x: 1, y: 4, z: 4 }, "ChessKnight.obj", "Black"),
  bk: new Piece("King", { x: 2, y: 4, z: 4 }, "ChessKing.obj", "Black"),
  bn2: new Piece("Knight", { x: 3, y: 4, z: 4 }, "ChessKnight.obj", "Black"),
  br2: new Piece("Rook", { x: 4, y: 4, z: 4 }, "ChessRook.obj", "Black"),
  bb1: new Piece("Bishop", { x: 1, y: 4, z: 3 }, "ChessBishop.obj", "Black"),
  bu1: new Piece("Unicorn", { x: 0, y: 4, z: 3 }, "ChessUnicorn.obj", "Black"),
  bq: new Piece("Queen", { x: 2, y: 4, z: 3 }, "ChessQueen.obj", "Black"),
  bb2: new Piece("Bishop", { x: 4, y: 4, z: 3 }, "ChessBishop.obj", "Black"),
  bu2: new Piece("Unicorn", { x: 3, y: 4, z: 3 }, "ChessUnicorn.obj", "Black"),
};
const getPieceFromState = (type, coordinates) => {
  for (const piece in GameState) {
    if (
      GameState[piece].type === type &&
      GameState[piece].coordinates.x === coordinates.x &&
      GameState[piece].coordinates.y === coordinates.y &&
      GameState[piece].coordinates.z === coordinates.z
    )
      return GameState[piece];
  }
  return "Not Found";
};
const createScene = async () => {
  const canvas = document.getElementById("renderCanvas"); // Get the canvas element
  const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
  // eslint-disable-next-line no-unused-vars
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera(
    "cam",
    0,
    (deg * 3) / 2,
    15,
    new BABYLON.Vector3(0, 0, 0),
    scene,
    true
  ); // new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
  // This targets the camera to scene origin

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
  camera.mode = BABYLON.Camera.PERSPECTIVE_CAMERA;
  camera.lowerAlphaLimit = (deg * 2) / 3;
  camera.upperAlphaLimit = (deg * 4) / 3;

  camera.lowerBetaLimit = deg;
  camera.upperBetaLimit = deg * 2;

  camera.lowerRadiusLimit = 12.5;
  camera.upperRadiusLimit = 22.5;
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(3, 3, 5)
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
  const mat = new BABYLON.StandardMaterial("white", scene);
  const mat1 = new BABYLON.StandardMaterial("brown", scene);
  const mat2 = new BABYLON.StandardMaterial("red", scene);
  mat.diffuseTexture = new BABYLON.Texture("/images/white.png", scene);
  mat1.diffuseTexture = new BABYLON.Texture("/images/brown.png", scene);
  mat2.diffuseTexture = new BABYLON.Texture("/images/red.png", scene);

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
        ThreeDBoard[i][j][k].position = new BABYLON.Vector3(i, j, k * 2);
        if ((j + k + i) % 2 === 1) {
          ThreeDBoard[i][j][k].material = mat1;
        } else {
          ThreeDBoard[i][j][k].material = mat;
        }
      }
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
    (await p).meshes[0].rotation = new BABYLON.Vector3(deg, 0, 0);
    if (GameState[piece].color === "White") (await p).meshes[0].material = mat;
    else if (GameState[piece].color === "Black")
      (await p).meshes[0].material = mat1;
    (await p).meshes[0].type = GameState[piece].type;
    GameRenderState[piece] = (await p).meshes[0];
  }
  scene.onPointerDown = async (evt, pickInfo) => {
    if (pickInfo.hit) {
      console.log("clicked");
      if (pickInfo.pickedMesh.status === "moveable") {
        getPieceFromState(pieceToMove.type, {
          x: pieceToMove.position.x,
          y: pieceToMove.position.y,
          z: pieceToMove.position.z / 2,
        }).coordinates = {
          x: pickInfo.pickedMesh.position.x,
          y: pickInfo.pickedMesh.position.y,
          z: pickInfo.pickedMesh.position.z / 2,
        };

        pieceToMove.position.x = pickInfo.pickedMesh.position.x;
        pieceToMove.position.y = pickInfo.pickedMesh.position.y;
        pieceToMove.position.z = pickInfo.pickedMesh.position.z;
        pieceToMove = null;
      }
      for (let i = 0; i < 5; i += 1)
        for (let j = 0; j < 5; j += 1)
          for (let k = 0; k < 5; k += 1) {
            ThreeDBoard[i][j][k].status = "";
            if ((j + k + i) % 2 === 1) {
              ThreeDBoard[i][j][k].material = mat1;
            } else {
              ThreeDBoard[i][j][k].material = mat;
            }
          }
      if (pickInfo.pickedMesh.type) {
        const movesList = await allMoves(pickInfo.pickedMesh.type, {
          x: pickInfo.pickedMesh.position.x,
          y: pickInfo.pickedMesh.position.y,
          z: pickInfo.pickedMesh.position.z / 2,
        });
        console.log(pickInfo.pickedMesh.position.z);
        console.log(movesList[0].x);
        for (let i = 0; i < movesList.length; i += 1) {
          ThreeDBoard[movesList[i].x][movesList[i].y][movesList[i].z].status =
            "moveable";
        }
        for (let i = 0; i < movesList.length; i += 1) {
          ThreeDBoard[movesList[i].x][movesList[i].y][
            movesList[i].z
          ].material = mat2;
        }
        pieceToMove = pickInfo.pickedMesh;
      }
    }
  };
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  camera.setTarget(ThreeDBoard[2][2][2]);
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
    const button = document.getElementById("MoveButton");
    button.addEventListener("click", async () => {
      //   GameState.p1.coordinates.y += 1;
      //   GameRenderState.p1.position.y = GameState.p1.coordinates.y;
      const print = await allMoves(GameState.p6.type, GameState.p6.coordinates);
      console.log(print[0].x);
      console.log(print[0].y);
      console.log(print[0].z);
      console.log(print[1].x);
      console.log(print[1].y);
      console.log(print[1].z);
    });
  },
  render: () => {
    return `<div>
    <canvas id="renderCanvas" touch-action="none"></canvas>
    <button id="MoveButton"> Move </button>
    </div>`;
  },
};
export default MainScreen;
