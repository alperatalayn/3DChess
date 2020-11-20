import { clearUser, getUserInfo } from "../localStorage";

const ProfileScreen = {
  after_render: () => {
    document.getElementById("update-button").addEventListener("click", () => {
      document.location.hash = "/updateprofile";
    });
    document.getElementById("signout-button").addEventListener("click", () => {
      clearUser();
      document.location.hash = "/";
    });
  },
  render: async () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }
    return `
    `;
  },
};
export default ProfileScreen;
