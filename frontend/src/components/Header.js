import { getUserInfo } from "../localStorage";

const Header = {
  after_render: () => {},
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
