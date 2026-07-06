const usersService = require('../services/users.services');

const getUsers = async (req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const createUser = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send('Bad Request');
  }

  const newUser = await usersService.create(req.body.name);

  res.status(201).send(newUser);
};

const getUserById = async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const searchedUser = await usersService.getById(id);

  if (!searchedUser) {
    return res.status(404).send('Not Found');
  }

  res.status(200).send(searchedUser);
};

const deleteUser = async (req, res) => {
  const userId = Number(req.params.id);

  if (Number.isNaN(userId)) {
    return res.status(400).send('Bad Request');
  }

  const deletedUser = await usersService.remove(userId);

  if (!deletedUser) {
    return res.status(404).send('Not Found');
  }

  res.status(204).send();
};

const updateUser = async (req, res) => {
  const userId = Number(req.params.id);
  const userName = req.body.name?.trim();

  if (Number.isNaN(userId) || !userName) {
    return res.status(400).send('Bad Request: Invalid data');
  }

  const updatedUser = await usersService.update(userId, userName);

  if (!updatedUser) {
    return res.status(404).send('Not Found');
  }

  res.status(200).send(updatedUser);
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
