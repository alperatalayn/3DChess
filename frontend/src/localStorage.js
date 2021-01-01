export const setUserInfo = ({
  _id = "",
  name = "",
  email = "",
  token = "",
  isAdmin = false,
}) => {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({
      _id,
      name,
      email,
      token,
      isAdmin,
    })
  );
};
export const clearUser = () => {
  localStorage.removeItem("userInfo");
};
export const getUserInfo = () => {
  return localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
};
export const setGameState = (gamestate) => {
  localStorage.setItem(
    "gameState",
    JSON.stringify({
      gamestate,
    })
  );
};
export const setRoom = (room) => {
  localStorage.setItem("room", room);
};
export const getRoom = () => {
  if (localStorage.getItem("room")) return localStorage.getItem("room");
  return null;
};
export const setColor = (color) => {
  localStorage.setItem("color", JSON.stringify(color));
};
export const getColor = () => {
  if (localStorage.getItem("color"))
    return JSON.parse(localStorage.getItem("color"));
  return null;
};
export const setNextToMove = (nextToMove) => {
  localStorage.setItem("next-to-move", JSON.stringify(nextToMove));
};
export const getNextToMove = () => {
  if (localStorage.getItem("next-to-move"))
    return JSON.parse(localStorage.getItem("next-to-move"));
  return null;
};
export const getGameState = () => {
  if (localStorage.getItem("gameState"))
    return JSON.parse(localStorage.getItem("gameState")).gamestate;
  return null;
};
export const clearGame = async () => {
  localStorage.removeItem("gameState");
  localStorage.removeItem("next-to-move");
  localStorage.removeItem("color");
  localStorage.removeItem("room");
  localStorage.removeItem("notation");
};
export const setNotation = (notation) => {
  localStorage.setItem(
    "notation",
    JSON.stringify({
      notation,
    })
  );
};
export const getNotation = () => {
  if (localStorage.getItem("notation"))
    return JSON.parse(localStorage.getItem("notation")).notation;
  return [];
};
export const setOpponent = (opponent) => {
  localStorage.setItem(
    "opponent",
    JSON.stringify({
      opponent,
    })
  );
};
export const getOpponent = () => {
  return JSON.parse(localStorage.getItem("opponent")).opponent;
};
