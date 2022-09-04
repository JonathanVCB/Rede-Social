export class Modal {
  static template(form) {
    const main = document.createElement("main");
    const divContainer = document.querySelector(".container");
    main.classList.add("main_container");

    main.append(form);
    divContainer.append(main);
  }

  static loginForm() {
    const form = document.createElement("form");
    const h1 = document.createElement("h1");
    const inputEmail = document.createElement("input");
    const inputPass = document.createElement("input");
    const btnLogin = document.createElement("button");
    const span = document.createElement("span");
    const btnGoRegister = document.createElement("button");

    form.classList.add("main_form");

    h1.innerText = "Login";

    inputEmail.type = "email";
    inputEmail.placeholder = "Seu e-mail";
    inputEmail.id = "emailInput";

    inputPass.type = "password";
    inputPass.placeholder = "Sua senha";
    inputPass.id = "passInput";

    btnLogin.id = "login";
    btnLogin.innerText = "Logar";

    span.innerText = "Ainda não possui cadastro";

    btnGoRegister.id = "goRegister";

    btnGoRegister.innerText = "Ir para página de registro";

    form.append(h1, inputEmail, inputPass, btnLogin, span, btnGoRegister);

    return form;
  }

  static registerForm() {
    const form = document.createElement("form");
    const h1 = document.createElement("h1");
    const btnBack = document.createElement("button");
    const inputName = document.createElement("input");
    const inputEmail = document.createElement("input");
    const inputPass = document.createElement("input");
    const inputWork = document.createElement("input");
    const inputAvatar = document.createElement("input");
    const btnRegister = document.createElement("button");
    const span = document.createElement("span");
    const btnGoLogin = document.createElement("button");

    form.classList.add("main_form");

    h1.innerText = "Cadastro";

    btnBack.id = "back";
    btnBack.innerText = "Voltar";

    inputName.type = "text";
    inputName.placeholder = "Seu nome";
    inputName.id = "nameInput";

    inputEmail.type = "email";
    inputEmail.placeholder = "Seu e-mail";
    inputEmail.id = "emailInput";

    inputPass.type = "password";
    inputPass.placeholder = "Sua senha";
    inputPass.id = "passInput";

    inputWork.type = "text";
    inputWork.placeholder = "Qual o seu trabalho?";
    inputWork.id = "workInput";

    inputAvatar.type = "text";
    inputAvatar.placeholder = "URL da imagem de perfil";
    inputAvatar.id = "avatarInput";

    btnRegister.id = "register";
    btnRegister.innerText = "Registrar";

    span.innerText = "Já possui login?";

    btnGoLogin.id = "goLogin";
    btnGoLogin.innerText = "Ir para página de login";

    form.append(
      h1,
      btnBack,
      inputName,
      inputEmail,
      inputPass,
      inputWork,
      inputAvatar,
      btnRegister,
      span,
      btnGoLogin
    );

    return form;
  }

  static modalPost(post) {
    const body = document.querySelector("body");
    const section = document.createElement("section");
    const divmain = document.createElement("div");
    const header = document.createElement("header");
    const img = document.createElement("img");
    const divInfo = document.createElement("div");
    const name = document.createElement("h3");
    const work = document.createElement("p");
    const btnClose = document.createElement("button");
    const divModal = document.createElement("div");
    const title = document.createElement("h2");
    const desc = document.createElement("p");

    section.classList.add("backgound_modal");
    header.classList.add("header_modal");

    img.src = post.author.image;

    divInfo.classList.add("header_modal_info");

    name.innerText = post.author.username;
    work.innerText = post.author.work_at;
    btnClose.innerText = "X";

    btnClose.addEventListener("click", (event) => {
      event.preventDefault();
      section.remove();
    });

    divModal.classList.add("modal_post");

    title.innerText = post.title;
    desc.innerText = post.description;

    divModal.append(title, desc);
    divInfo.append(name, work);
    header.append(img, divInfo, btnClose);
    divmain.append(header, divModal);
    section.append(divmain);
    body.append(section);
  }
}
