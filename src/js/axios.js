const token = localStorage.getItem("@kenzieSocial:token");

export const instance = axios.create({
  baseURL: "https://m2-rede-social.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const instanceWithToken = axios.create({
  baseURL: "https://m2-rede-social.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  },
});
