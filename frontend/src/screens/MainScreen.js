/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { initialState } from "../config";
import { getGameState, setGameState } from "../localStorage";
import { getPieceFromState, inCheckMoves, isCheck, legalMoves } from "../moves";
// import TwoDBoards from "../components/TwoDBoards";

const deg = 1.5707;
let pieceToMove = null;
if (!getGameState()) setGameState(initialState);
const GameState = getGameState();

const deletePieceFromState = (pieceInput, scene) => {
  scene
    .getMeshByName(getKeyByValue(GameState, pieceInput.coordinates))
    .dispose();
  for (const piece in GameState) {
    if (GameState[piece] === pieceInput) {
      delete GameState[piece];
    }
  }
  return "Not Found";
};
function getKeyByValue(object, coordinates) {
  return Object.keys(object).find(
    (key) =>
      object[key].coordinates.x === coordinates.x &&
      object[key].coordinates.y === coordinates.y &&
      object[key].coordinates.z === coordinates.z
  );
}
const createScene = async () => {
  const canvas = document.getElementById("renderCanvas"); // Get the canvas element
  const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
  // eslint-disable-next-line no-unused-vars
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera(
    "cam",
    (deg * 3) / 3,
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
        ThreeDBoard[i][j][k].position = new BABYLON.Vector3(i, j, k * 2);
        if ((j + k + i) % 2 === 1) {
          ThreeDBoard[i][j][k].material = brownMaterial;
        } else {
          ThreeDBoard[i][j][k].material = whiteMaterial;
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
    if (GameState[piece].color === "White")
      (await p).meshes[0].material = whiteMaterial;
    else if (GameState[piece].color === "Black")
      (await p).meshes[0].material = brownMaterial;
    (await p).meshes[0].type = GameState[piece].type;
    (await p).meshes[0].color = GameState[piece].color;
    (await p).meshes[0].name = piece;
    (await p).meshes[0].status = "";
  }
  scene.onPointerDown = async (evt, pickInfo) => {
    if (pickInfo.hit) {
      if (
        pickInfo.pickedMesh.type &&
        pieceToMove === null &&
        pickInfo.pickedMesh.status === ""
      ) {
        let movesList;
        if (
          (await isCheck(
            GameState,
            GameState.wk.coordinates,
            GameState.wk.color
          )) === true
        ) {
          movesList = await inCheckMoves(
            await legalMoves(
              GameState,
              pickInfo.pickedMesh.type,
              {
                x: pickInfo.pickedMesh.position.x,
                y: pickInfo.pickedMesh.position.y,
                z: pickInfo.pickedMesh.position.z / 2,
              },
              pickInfo.pickedMesh.color
            ),
            GameState,
            {
              x: pickInfo.pickedMesh.position.x,
              y: pickInfo.pickedMesh.position.y,
              z: pickInfo.pickedMesh.position.z / 2,
            },
            pickInfo.pickedMesh.color
          );
        } else {
          movesList = await legalMoves(
            GameState,
            pickInfo.pickedMesh.type,
            {
              x: pickInfo.pickedMesh.position.x,
              y: pickInfo.pickedMesh.position.y,
              z: pickInfo.pickedMesh.position.z / 2,
            },
            pickInfo.pickedMesh.color
          );
        }

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
      } else if (pickInfo.pickedMesh.status === "moveable") {
        getPieceFromState(GameState, {
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
      } else if (pickInfo.pickedMesh.status === "can-capture") {
        deletePieceFromState(
          getPieceFromState(GameState, {
            x: pickInfo.pickedMesh.position.x,
            y: pickInfo.pickedMesh.position.y,
            z: pickInfo.pickedMesh.position.z / 2,
          }),
          scene
        );
        getPieceFromState(GameState, {
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
      } else {
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
      setGameState(GameState);
      isCheck(GameState, GameState.wk.coordinates, GameState.wk.color);
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
