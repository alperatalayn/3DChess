import { indexToSquare } from "../config";

let component = `<table id="board${indexToSquare(124).level}" 
class="board selected" cellpadding="0" cellspacing="0"><tbody><tr>`;
for (let i = 124; i >= 0; i -= 1) {
  if ((i + 1) % 25 === 0 && i + 1 !== 125) {
    component += `</tr></tbody></table>`;
    component += `<table id="board${
      indexToSquare(i).level
    }" class="board unselected" cellpadding="0" cellspacing="0"><tbody><tr>`;
  } else if ((i + 1) % 5 === 0 && i + 1 !== 125) {
    component += `</tr><tr>`;
  }
  if (i % 2 === 0) component += `<td class="dark" id = "${i}"></td>`;
  else component += `<td class="light" id = "${i}"></td>`;
}
component += "</tr></tbody></table>";

const twoDBoards = component;
export default twoDBoards;
