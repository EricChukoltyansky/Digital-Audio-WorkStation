import axios from "axios";

let myUrl = "http://localhost:3001/";

if (process.env.NODE_ENV === "production") {
  myUrl = "/";
}
export default axios.create({
  baseURL: myUrl,
});