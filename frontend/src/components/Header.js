import { getUserInfo } from "../localStorage";

const Header = {
  after_render: () => {},
  render: () => {
    const user = getUserInfo();
    return `
    <div class="brand">
        <a href="/#/">3DChess</a>
    </div>
    <div>
    ${
      user
        ? `<a href="/#/profile">${user.name}</a>`
        : `<a href="/#/signin">Sign-In</a>`
    }
    </div>
    `;
  },
};
export default Header;
