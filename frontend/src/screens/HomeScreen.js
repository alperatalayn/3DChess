import { getUserInfo } from "../localStorage";

const MainScreen = {
  after_render: async () => {
    document.getElementById("PlayButton").addEventListener("click", () => {
      if (getUserInfo()) {
        document.location.hash = "/play";
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
