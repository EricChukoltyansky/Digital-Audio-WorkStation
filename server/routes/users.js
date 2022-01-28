const express = require("express");
const rootRouter = express.Router();
const auth = require("../middleware/auth");

const {
  addUser,
  userLogin,
  userLogout,
} = require("../controllers/users/controllers");

rootRouter.get("/me", auth, async (req, res) => {
  res.send(req.user);
});


rootRouter.post("/users", addUser);



rootRouter.post("/login", userLogin);

rootRouter.post("/logout", auth, userLogout);
