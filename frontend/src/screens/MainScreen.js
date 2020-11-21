/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
// import TwoDBoards from "../components/TwoDBoards";

class Piece {
  constructor(type, { x, y, z }, obj, color) {
    this.obj = obj;
    this.coordinates = { x, y, z };
    this.type = type;
    this.color = color;
  }
}
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
  p11: new Piece("Rook", { x: 0, y: 0, z: 0 }, "ChessRook.obj", "White"),
  p12: new Piece("Knight", { x: 1, y: 0, z: 0 }, "ChessKnight.obj", "White"),
  p13: new Piece("King", { x: 2, y: 0, z: 0 }, "ChessKing.obj", "White"),
  p14: new Piece("Knight", { x: 3, y: 0, z: 0 }, "ChessKnight.obj", "White"),
  p15: new Piece("Rook", { x: 4, y: 0, z: 0 }, "ChessRook.obj", "White"),
  p16: new Piece("Bishop", { x: 0, y: 0, z: 1 }, "ChessBishop.obj", "White"),
  p17: new Piece(
    "Unicorn",
    { x: 1, y: 0, z: 1 },
    "ChessUnicornWhite.obj",
    "White"
  ),
  p18: new Piece("Queen", { x: 2, y: 0, z: 1 }, "ChessQueen.obj", "White"),
  p19: new Piece("Bishop", { x: 3, y: 0, z: 1 }, "ChessBishop.obj", "White"),
  p20: new Piece(
    "Unicorn",
    { x: 4, y: 0, z: 1 },
    "ChessUnicornWhite.obj",
    "White"
  ),

  p21: new Piece("WhitePawn", { x: 0, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  p22: new Piece("WhitePawn", { x: 1, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  p23: new Piece("WhitePawn", { x: 2, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  p24: new Piece("WhitePawn", { x: 3, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  p25: new Piece("WhitePawn", { x: 4, y: 3, z: 4 }, "ChessPawn.obj", "Black"),
  p26: new Piece("WhitePawn", { x: 0, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  p27: new Piece("WhitePawn", { x: 1, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  p28: new Piece("WhitePawn", { x: 2, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  p29: new Piece("WhitePawn", { x: 3, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  p30: new Piece("WhitePawn", { x: 4, y: 3, z: 3 }, "ChessPawn.obj", "Black"),
  p31: new Piece("Rook", { x: 0, y: 4, z: 4 }, "ChessRook.obj", "Black"),
  p32: new Piece("Knight", { x: 1, y: 4, z: 4 }, "ChessKnight.obj", "Black"),
  p33: new Piece("King", { x: 2, y: 4, z: 4 }, "ChessKing.obj", "Black"),
  p34: new Piece("Knight", { x: 3, y: 4, z: 4 }, "ChessKnight.obj", "Black"),
  p35: new Piece("Rook", { x: 4, y: 4, z: 4 }, "ChessRook.obj", "Black"),
  p36: new Piece("Bishop", { x: 1, y: 4, z: 3 }, "ChessBishop.obj", "Black"),
  p37: new Piece(
    "Unicorn",
    { x: 0, y: 4, z: 3 },
    "ChessUnicornWhite.obj",
    "Black"
  ),
  p38: new Piece("Queen", { x: 2, y: 4, z: 3 }, "ChessQueen.obj", "Black"),
  p39: new Piece("Bishop", { x: 4, y: 4, z: 3 }, "ChessBishop.obj", "Black"),
  p40: new Piece(
    "Unicorn",
    { x: 3, y: 4, z: 3 },
    "ChessUnicornWhite.obj",
    "Black"
  ),
};

// function move(Piece, GameState, x, y, z) {
//   if (Piece.type === "WhitePawn") {
//     P;
//   } else if (Piece.type === "WhitePawn") {
//   } else if (Piece.type === "WhitePawn") {
//   } else if (Piece.type === "WhitePawn") {
//   } else if (Piece.type === "WhitePawn") {
//   } else if (Piece.type === "WhitePawn") {
//   } else if (Piece.type === "WhitePawn") {
//   } else if (Piece.type === "WhitePawn") {
//   }
// }

const deg = 1.57079633;
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
  mat.diffuseTexture = new BABYLON.Texture("/images/white.png", scene);
  mat1.diffuseTexture = new BABYLON.Texture("/images/brown.png", scene);

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
        ThreeDBoard[i][j][k].position = new BABYLON.Vector3(i, j, k * 2.15);
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
      GameState[piece].coordinates.z * 2.15 + 0.09
    );
    (await p).meshes[0].rotation = new BABYLON.Vector3(deg, 0, 0);
    if (GameState[piece].color === "White") (await p).meshes[0].material = mat;
    else if (GameState[piece].color === "Black")
      (await p).meshes[0].material = mat1;
    GameRenderState[piece] = (await p).meshes[0];
  }

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
      GameState.p1.coordinates.y += 1;
      GameRenderState.p1.position.y = GameState.p1.coordinates.y;
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
