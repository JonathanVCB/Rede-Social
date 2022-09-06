import { Modal } from "./modal.js";
import { Requests } from "./requests.js";

class Homepage {
  static token = localStorage.getItem("@kenzieSocial:token");
  static id = localStorage.getItem("@kenzieSocial:id");

  static dontHaveToken() {
    const token = localStorage.getItem("@kenzieSocial:token");

    if (!token) {
      window.location.replace("../../index.html");
    }
  }

  static async loadUser() {
    const user = await Requests.getUser(this.id);
    const divUser = document.querySelector(".profile_container");

    const imgUser = document.createElement("img");
    const divInfos = document.createElement("div");
    const nameUser = document.createElement("h2");
    const workUser = document.createElement("p");
    const followersUser = document.createElement("span");

    imgUser.src = user.image;

    divInfos.classList.add("profile_infos");

    nameUser.innerText = user.username;
    workUser.innerText = user.work_at;

    if (user.followers_amount < 2) {
      followersUser.innerText = `${user.followers_amount} seguidor`;
    } else {
      followersUser.innerText = `${user.followers_amount} seguidores`;
    }

    divInfos.append(nameUser, workUser);
    divUser.append(imgUser, divInfos, followersUser);
  }

  static async loadPosts() {
    const posts = await Requests.getPosts();
    const ulPosts = document.querySelector(".main_container_posts");

    posts.forEach(async (elem) => {
      const card = await Homepage.listPosts(elem);
      ulPosts.append(card);
    });
  }

  static async listPosts(post) {
    const liPost = document.createElement("li");
    const divProfile = document.createElement("div");
    const imgUser = document.createElement("img");
    const divPost = document.createElement("div");
    const nameUser = document.createElement("h3");
    const workUser = document.createElement("p");
    const titlePost = document.createElement("h3");
    const descPost = document.createElement("p");
    const divFooter = document.createElement("div");
    const btnOpen = document.createElement("button");
    const divLike = document.createElement("div");
    const iconLike = document.createElement("i");
    const likes = document.createElement("p");

    divProfile.classList.add("container_profile_list");

    imgUser.src = post.author.image;

    divPost.classList.add("post_profile_info_list");

    nameUser.innerText = post.author.username;
    workUser.innerText = post.author.work_at;

    titlePost.innerText = post.title;
    descPost.innerText = post.description;

    divFooter.classList.add("post_footer");

    btnOpen.id = "openPost";
    btnOpen.innerText = "Abrir Post";

    divLike.classList.add("post_list_like");
    iconLike.classList.add("fas");
    iconLike.classList.add("fa-heart");

    likes.innerText = post.likes.length;

    divLike.append(iconLike, likes);
    divFooter.append(btnOpen, divLike);

    divPost.append(nameUser, workUser);

    divProfile.append(imgUser, divPost);
    liPost.append(divProfile, titlePost, descPost, divFooter);

    btnOpen.addEventListener("click", (event) => {
      event.preventDefault();
      Modal.modalPost(post);
    });

    if (
      post.likes.some((elem) => {
        return elem.user.uuid == Homepage.id;
      }) == true
    ) {
      iconLike.style.color = "red";
    } else {
      iconLike.style.color = "grey";
    }

    iconLike.addEventListener("click", () => {
      if (iconLike.style.color == "grey") {
        iconLike.style.color = "red";

        const data = {
          post_uuid: post.uuid,
        };
        Requests.like(data);

        if (likes.innerText == post.likes.length - 1) {
          likes.innerText = post.likes.length;
        } else {
          likes.innerText = post.likes.length + 1;
        }
      } else {
        iconLike.style.color = "grey";
        if (likes.innerText == post.likes.length) {
          likes.innerText = post.likes.length - 1;
        } else {
          likes.innerText = post.likes.length;
        }

        const myLike = post.likes.filter((ele) => {
          if (ele.user.uuid == Homepage.id) {
            return ele;
          }
        });

        const id = myLike[0].uuid;
        Requests.deslike(id);
      }
    });

    return liPost;
  }

  static async loadSugestion() {
    const ul = document.querySelector(".sugestion_list");
    const users = await Requests.getAllUsers();

    let randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 3);

    randomUsers.forEach(async (elem) => {
      const card = await Homepage.listUsers(elem);
      ul.append(card);
    });
  }

  static async listUsers(user) {
    const li = document.createElement("li");
    const divProfile = document.createElement("div");
    const imgUser = document.createElement("img");
    const divInfo = document.createElement("div");
    const nameUser = document.createElement("h3");
    const workUser = document.createElement("p");
    const follow = document.createElement("span");

    divProfile.classList.add("list_profile_container");

    imgUser.src = user.image;

    divInfo.classList.add("list_info");

    nameUser.innerText = user.username;
    workUser.innerText = user.work_at;

    if (
      user.followers.some((elem) => {
        return elem.followers_users_id.uuid == Homepage.id;
      }) == true
    ) {
      follow.innerText = "Seguindo";
      follow.style.color = "var(--white)";
      follow.style.backgroundColor = "var(--brand-1)";
      follow.style.border = "none";
    } else {
      follow.innerText = "Seguir";
      follow.style.color = "var(--grey1)";
      follow.style.backgroundColor = "var(--white)";
      follow.style.border = "1px solid var(--grey1)";
    }

    follow.id = "follow";

    follow.addEventListener("click", async (event) => {
      if (follow.innerText == "Seguir") {
        follow.innerText = "Seguindo";
        follow.style.color = "var(--white)";
        follow.style.backgroundColor = "var(--brand-1)";
        follow.style.border = "none";
        const data = {
          following_users_uuid: user.uuid,
        };
        Requests.follow(data);
      } else {
        follow.innerText = "Seguir";
        follow.style.color = "var(--grey1)";
        follow.style.backgroundColor = "var(--white)";
        follow.style.border = "1px solid var(--grey1)";

        const myFollow = user.followers.filter((ele) => {
          if (ele.followers_users_id.uuid == Homepage.id) {
            return ele;
          }
        });

        const id = myFollow[0].uuid;
        Requests.unFollow(id);
      }
    });

    divInfo.append(nameUser, workUser);
    divProfile.append(imgUser, divInfo);
    li.append(divProfile, follow);
    return li;
  }

  static async postCreate() {
    const titleInput = document.getElementById("titlePost");
    const descInput = document.getElementById("descPost");
    const btnPost = document.getElementById("post");

    btnPost.addEventListener("click", (event) => {
      event.preventDefault();

      const data = {
        title: titleInput.value,
        description: descInput.value,
      };

      Requests.createPost(data);
    });
  }

  static Logout() {
    const btnLogout = document.getElementById("logout");
    btnLogout.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("@kenzieSocial:token");
      localStorage.removeItem("@kenzieSocial:id");
      window.location.replace("../../index.html");
    });
  }
}

Homepage.dontHaveToken();
Homepage.loadUser();
Homepage.loadPosts();
Homepage.loadSugestion();
Homepage.postCreate();
Homepage.Logout();
