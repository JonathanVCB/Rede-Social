import { Modal } from "./modal.js";
import { Requests } from "./requests.js";

class Index {
  static haveToken() {
    const token = localStorage.getItem("@kenzieSocial:token");

    if (token) {
      window.location.replace("/src/pages/dashboard.html");
    }
  }

  static showModalLogin() {
    const btnShowLogin = document.getElementById("loginModal");
    const divContainer = document.querySelector(".container");
    const liLogin = document.getElementById("loginModal");
    const liRegister = document.getElementById("registerModal");

    btnShowLogin.addEventListener("click", () => {
      liLogin.style.backgroundColor = "var(--grey2)";
      liRegister.style.backgroundColor = "var(--grey1";
      divContainer.innerHTML = "";
      const newModalLogin = Modal.loginForm();
      Modal.template(newModalLogin);
      Index.goRegister();
      Index.login();
    });
  }
  static showModalRegister() {
    const btnShowRegister = document.getElementById("registerModal");
    const divContainer = document.querySelector(".container");
    const liRegister = document.getElementById("registerModal");
    const liLogin = document.getElementById("loginModal");

    btnShowRegister.addEventListener("click", () => {
      liRegister.style.backgroundColor = "var(--grey2)";
      liLogin.style.backgroundColor = "var(--grey1)";
      divContainer.innerHTML = "";
      const newModalRegister = Modal.registerForm();
      Modal.template(newModalRegister);
      Index.Register();
    });
  }

  static goRegister() {
    const btnGoRegister = document.getElementById("goRegister");
    const divContainer = document.querySelector(".container");
    const liRegister = document.getElementById("registerModal");
    const liLogin = document.getElementById("loginModal");

    btnGoRegister.addEventListener("click", (event) => {
      event.preventDefault();
      liRegister.style.backgroundColor = "var(--grey2)";
      liLogin.style.backgroundColor = "var(--grey1)";
      divContainer.innerHTML = "";
      const newModalRegister = Modal.registerForm();
      Modal.template(newModalRegister);
      Index.Register();
    });
  }

  static login() {
    const inputEmail = document.getElementById("emailInput");
    const inputPass = document.getElementById("passInput");
    const btnLogin = document.getElementById("login");

    btnLogin.addEventListener("click", async (event) => {
      event.preventDefault();
      const data = {
        email: inputEmail.value,
        password: inputPass.value,
      };

      console.log(data);
      await Requests.login(data);
    });
  }

  static Register() {
    const inputName = document.getElementById("nameInput");
    const inputEmail = document.getElementById("emailInput");
    const inputPass = document.getElementById("passInput");
    const workInput = document.getElementById("workInput");
    const avatarInput = document.getElementById("avatarInput");
    const btnRegister = document.getElementById("register");

    btnRegister.addEventListener("click", async (even) => {
      even.preventDefault();
      const data = {
        username: inputName.value,
        email: inputEmail.value,
        password: inputPass.value,
        work_at: workInput.value,
        image: avatarInput.value,
      };
      console.log(data);
      await Requests.register(data);
    });
  }
}

Index.haveToken();
Index.showModalLogin();
Index.showModalRegister();
Index.goRegister();
Index.login();
