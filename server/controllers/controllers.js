// const User = require("../models/user");

// const addUser = async (req, res) => {
//   const user = new User(req.body);
//   try {
//     await user.save();
//     const token = await user.generateAuthToken();
//     res.status(201).send({ user, token });
//   } catch (e) {
//     res.status.send(e.message);
//   }
// };

let users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const existingUser = users.find((user) => user.room === room && user.name === name);

  if (existingUser) {
    return { error: "Username is taken" };
  }

  const user = { id, name, room };
  users.push(user);
  console.log(users);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => {
      return user.id === id
  });

  if(index !== -1) {
      return users.splice(index,1)[0];
  }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
