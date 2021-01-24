import axios from "axios";

const instance = axios.create({
  baseURL: "https://gateway.marvel.com:443/v1",
});

export default instance;
