import axios from "axios";

let myUrl = "http://localhost:3001"; //development

if (process.env.NODE_ENV === "production") {
  myUrl = "api";
}
export default axios.create({
  baseURL: myUrl,
});
