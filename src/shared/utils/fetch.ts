import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? "http://localhost:3000/api" : "https://my-json-server.typicode.com/SecretRoom/mockjson/",
  headers: {
    "Content-type": "application/json"
  }
})

export { Axios };