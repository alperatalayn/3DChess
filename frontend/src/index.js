import { parseRequestUrl, showLoading, hideLoading } from "./utils";
import Error404Screen from "./screens/Error404Screen";
import SigninScreen from "./screens/SigninScreen";
import Header from "./components/Header";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UpdateProfileScreen from "./screens/UpdateProfileScreen";
import MainScreen from "./screens/MainScreen";

const routes = {
  "/signin": SigninScreen,
  "/register": RegisterScreen,
  "/profile": ProfileScreen,
  "/updateprofile": UpdateProfileScreen,
  "/": MainScreen,
};
const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById("header-container");
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById("main-container");
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
  hideLoading();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
