import axios from "axios";

// const client = axios.create({
//   baseURL: "http://192.168.0.14:3000/api",
// });

const client = axios.create({
  baseURL: "https://plasticaway.ew.r.appspot.com/api",
});

export default client;
