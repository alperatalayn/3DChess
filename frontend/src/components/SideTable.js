import { getColor, getNotation } from "../localStorage";
import { socket } from "../api";

const player = getColor();

socket.on("timeupdate", (data) => {
  if (data.white && data.black) {
    if (player === -1) {
      document.getElementById("player-time").innerHTML = `${Math.floor(
        data.black / 60
      )}:${data.black % 60}`;
      document.getElementById("opponent-time").innerHTML = `${Math.floor(
        data.white / 60
      )}:${data.white % 60}`;
    } else {
      document.getElementById("player-time").innerHTML = `${Math.floor(
        data.white / 60
      )}:${data.white % 60}`;
      document.getElementById("opponent-time").innerHTML = `${Math.floor(
        data.black / 60
      )}:${data.black % 60}`;
    }
  }
});
const SideTable = {
  render: async () => {
    let moveCounter = 0;
    const currentNotation = getNotation();
    return `
        <div class="clock">                
            <div id="opponent">
                <p id="opponent-time">
                </p>
            </div>
        </div>
        <div id="notation" class="notation container-fluid row"><ul>${currentNotation
          .map((element) => {
            moveCounter += 1;
            return `
            
            ${
              moveCounter % 2 === 1
                ? `<div class ="move-counter col-md-2"><li>${
                    (moveCounter + 1) / 2
                  }</li></div>`
                : ``
            }
                <div class="col-md-5"><li>${element}</li></div>
                `;
          })
          .join("\n")}</ul></div>
        <div>
            <button id="resignButton"> Resign </button>
        </div>
        <div class="clock">
            <div id="player">
                <p id="player-time">
                    
                </p>
            </div>
        </div>
    `;
  },
  updatenotation: async () => {
    const currentNotation = getNotation();
    let moveCounter = 0;
    document.getElementById("notation").innerHTML = `<ul>${currentNotation
      .map((element) => {
        moveCounter += 1;
        return `
        
        ${
          moveCounter % 2 === 1
            ? `<div class ="move-counter col-md-2"><li>${
                (moveCounter + 1) / 2
              }</li></div>`
            : ``
        }
            <div class="col-md-5"><li>${element}</li></div>
            `;
      })
      .join("\n")}</ul>`;
  },
};
export default SideTable;
