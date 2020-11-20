import { getUserInfo } from "../localStorage";

const Header = {
  after_render: () => {
    const { isAdmin } = getUserInfo();
    if (isAdmin)
      document
        .getElementById("go-to-create-button")
        .addEventListener("click", async () => {
          document.location.hash = "/create";
        });
  },
  render: () => {
    const { name } = getUserInfo();
    return `
    <div class="brand">
        <a href="/#/">3DChess</a>
    </div>
    <div>
    ${
      name
        ? `<a href="/#/profile">${name}</a>`
        : `<a href="/#/signin">Sign-In</a>`
    }
    </div>
    `;
  },
};
export default Header;
