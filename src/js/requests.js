import { instance, instanceWithToken } from "./axios.js";
import { Toast } from "./toast.js";

export class Requests {
  static async login(body) {
    const userLogin = await instance
      .post("/users/login/", body)
      .then((res) => {
        localStorage.setItem("@kenzieSocial:token", res.data.token);
        localStorage.setItem("@kenzieSocial:id", res.data.user_uuid);
        Toast.create("Login realizado com sucesso!", "green");
        setTimeout(() => {
          window.location.replace("/src/pages/dashboard.html");
        }, 1500);

        console.log(res);
      })
      .catch((err) => {
        if (err.response.data.email) {
          Toast.create(`Email: ${err.response.data.email}`, "red");
        } else if (err.response.data.password) {
          Toast.create(`Password: ${err.response.data.password}`, "red");
        } else if (err.response.data.non_field_errors) {
          Toast.create(err.response.data.non_field_errors, "red");
        }

        console.log(err);
      });

    return userLogin;
  }

  static async register(body) {
    const userRegister = await instance
      .post("/users/", body)
      .then((res) => {
        Toast.create("registro realizado com sucesso", "green");
        setTimeout(() => {
          location.reload();
        }, 1500);
      })
      .catch((err) => {
        if (err.response.data.email) {
          Toast.create(`Email: ${err.response.data.email}`, "red");
        } else if (err.response.data.image) {
          Toast.create(`Image: ${err.response.data.image}`, "red");
        } else if (err.response.data.password) {
          Toast.create(`Senha: ${err.response.data.password}`, "red");
        } else if (err.response.data.username) {
          Toast.create(`Seu Nome: ${err.response.data.username}`, "red");
        } else if (err.response.data.work_at) {
          Toast.create(
            `Qual seu trabalho: ${err.response.data.work_at}`,
            "red"
          );
        }
        console.log(err);
      });
    return userRegister;
  }

  static async getUser(id) {
    const userGet = await instanceWithToken
      .get(`/users/${id}/`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return userGet;
  }

  static async getPosts() {
    const postsGet = await instanceWithToken
      .get("/posts/?limit=10&offset=1/")
      .then((res) => {
        return res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
    return postsGet;
  }

  static async getAllUsers() {
    const getUsers = await instanceWithToken
      .get("/users/")
      .then((res) => {
        return res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
    return getUsers;
  }

  static async createPost(body) {
    const postcreate = await instanceWithToken
      .post("/posts/", body)
      .then((res) => {
        Toast.create("Post criado com sucesso!", "green");
        setTimeout(() => {
          location.reload();
        }, 1500);
      })
      .catch((err) => {
        Toast.create(err.message, "red");
      });
    return postcreate;
  }

  static async follow(body) {
    const followUser = await instanceWithToken
      .post("/users/follow/", body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    return followUser;
  }

  static async unFollow(id) {
    const unFollowUser = await instanceWithToken
      .delete(`/users/unfollow/${id}/`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    return unFollowUser;
  }

  static async like(body) {
    const likePost = await instanceWithToken
      .post("/likes/", body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    return likePost;
  }

  static async deslike(id) {
    const deslike = await instanceWithToken
      .delete(`likes/${id}/`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    return deslike;
  }
}
