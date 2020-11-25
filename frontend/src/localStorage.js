export const setUserInfo = ({
  _id = "",
  name = "",
  email = "",
  password = "",
  token = "",
  isAdmin = false,
}) => {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({
      _id,
      name,
      email,
      password,
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
    : { _id: "", name: "", email: "", password: "" };
};
export const setGameState = (gamestate) => {
  localStorage.setItem(
    "gameState",
    JSON.stringify({
      gamestate,
    })
  );
  console.log(getGameState());
};
export const getGameState = () => {
  if (localStorage.getItem("gameState"))
    return JSON.parse(localStorage.getItem("gameState")).gamestate;
  return null;
};
