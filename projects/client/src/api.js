import axios from "axios";

const instance = axios.create({
  baseURL: "https://jcwd250402.purwadhikabootcamp.com/api",
});

export default instance;
