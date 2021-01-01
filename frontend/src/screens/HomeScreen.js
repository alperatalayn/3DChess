import { socket } from "../api";
import { startingPosBoard } from "../config";
import {
  clearGame,
  getUserInfo,
  setColor,
  setGameState,
  setNextToMove,
  setOpponent,
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
      setNextToMove(1);
      setRoom(data.room);
      setOpponent(data.opponent);
      setColor(data.color);
      setGameState(startingPosBoard());
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
