import { socket } from "../api";
import { initialState } from "../config";
import {
  clearGame,
  getUserInfo,
  setColor,
  setGameState,
  setNextToMove,
  setRoom,
} from "../localStorage";
import { hideLoading, showLoading } from "../utils";

const MainScreen = {
  after_render: async () => {
    socket.on("waiting for opponent", () => {
      showLoading();
    });
    socket.on("game started", async (data) => {
      await clearGame();
      setNextToMove("White");
      setRoom(data.room);
      setColor(data.color);
      setGameState(initialState);
      hideLoading();
      document.location.hash = "/play";
    });
    document.getElementById("PlayButton").addEventListener("click", () => {
      const userInfo = getUserInfo();
      if (getUserInfo()) {
        socket.emit("search game", userInfo.name);
      } else {
        alert("Please Sign In First!");
      }
    });
  },
  render: async () => {
    return `<div>
      <button id="PlayButton"> Play! </button>
      </div>`;
  },
};
export default MainScreen;
