import { showLoading, hideLoading, showMessage } from "../utils";
import { getUserInfo, setUserInfo } from "../localStorage";
import { updateUser } from "../api";

const UpdateProfileScreen = {
  after_render: async () => {
    const { email } = getUserInfo();
    const validatedPassword = document.getElementById("password");
    const confirmPassword = document.getElementById("repassword");

    function validatePassword() {
      if (validatedPassword.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords Don't Match");
      } else {
        confirmPassword.setCustomValidity("");
      }
    }
    validatedPassword.onchange = validatePassword;
    confirmPassword.onkeyup = validatePassword;
    document
      .getElementById("profile-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await updateUser({
          name: document.getElementById("name").value,
          email: { email },
          password: validatedPassword.value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = "/";
        }
      });
  },
  render: async () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }
    return `
      <div class="content profile">
      <div class="profile-info">
      <div class="form-container">
      <form id="profile-form">
          <ul class="form-items">
              <li>
                  <h1>User Profile</h1>
              </li>
              <li>
                  <label for="name">Name</label>
                  <input type="name" name="name" id="name" value="${name}"/>
              </li>
              <li>
                  <label for="password">Password</label>
                  <input type="password" name="password" id="password" minlength=8/>
              </li>
              
              <li>
                  <label for="repassword">Password Again</label>
                  <input type="password" name="repassword" id="repassword" minlength=8/>
              </li>
              <li>
                  <button type="submit" class="primary fw">Update </button>
              </li>
          </ul>
      </form>
      </div>
      </div>
      </div>
            
        `;
  },
};

export default UpdateProfileScreen;
