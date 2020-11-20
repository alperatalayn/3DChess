import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { showLoading, hideLoading, showMessage, redirectUser } from "../utils";

const RegisterScreen = {
  after_render: async () => {
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
      .getElementById("register-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await register({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: validatedPassword.value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          redirectUser();
        }
      });
  },
  render: () => {
    if (getUserInfo().name) {
      redirectUser();
    }
    return `
            <div class="form-container">
                <form id="register-form">
                    <ul class="form-items">
                        <li>
                            <h1>Create Account</h1>
                        </li>
                        <li>
                            <label for="name">Name</label>
                            <input type="name" name="name" id="name"/>
                        <li>
                        <li>
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email"/>
                        <li>
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" minlength=8/>
                        </li>
                        <li>
                            <label for="repassword">Password Again</label>
                            <input type="password" name="repassword" id="repassword" minlength=8/>
                        </li>
                        <li>
                            <button type="submit" class="primary fw">Register </button>
                        </li>
                        <li>
                            <div>
                                Already Have an Account?
                                <a href="/#/signin">Sign In</a>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        `;
  },
};

export default RegisterScreen;
