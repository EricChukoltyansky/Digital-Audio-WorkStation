
const User = require("../models/user");

const addUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status.send(e.message);
  }
};

module.exports = {
  addUser,
};
