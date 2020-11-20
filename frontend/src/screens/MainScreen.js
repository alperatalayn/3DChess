import * as BABYLON from "babylonjs";

const createScene = () => {
  const canvas = document.getElementById("renderCanvas"); // Get the canvas element
  const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
  // eslint-disable-next-line no-unused-vars
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera(
    "cam",
    3.92699082,
    0.78539816,
    20,
    new BABYLON.Vector3(0, 0, 0),
    scene,
    true
  ); // new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
  // This targets the camera to scene origin

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
  camera.attachControl(canvas, true);
  camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
  camera.maxZ = 100000;
  camera.minZ = -100000;
  camera.orthoLeft = 5;
  camera.orthoTop = 5;
  camera.orthoRight = -5;
  camera.orthoBottom = -5;
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(500, 500, 500)
  );
  light.intensity = 0.3;
  const light2 = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(-5, -500, -500)
  );
  light2.intensity = 0.3;
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
        ThreeDBoard[i][j][k] = BABYLON.MeshBuilder.CreatePlane("box1", {
          size: 1,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          frontUVs: f,
          backUVs: b,
        });
        ThreeDBoard[i][j][k].position = new BABYLON.Vector3(i, j, k * 1.5);
        if ((j + k + i) % 2 === 1) {
          ThreeDBoard[i][j][k].material = mat;
        } else {
          ThreeDBoard[i][j][k].material = mat1;
        }
      }

  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

  camera.setTarget(ThreeDBoard[3][3][3]);
  return scene;
};

const animateScene = () => {
  const newScene = createScene();
  const engine = newScene.getEngine();
  engine.runRenderLoop(() => {
    newScene.render();
  });
  window.addEventListener("resize", () => {
    engine.resize();
  });
};

const MainScreen = {
  after_render: () => {
    animateScene();
  },
  render: () => {
    return `<div>
    <canvas id="renderCanvas" touch-action="none"></canvas>
    </div>`;
  },
};
export default MainScreen;
