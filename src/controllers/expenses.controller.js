const expensesService = require('../services/expenses.services');
const usersService = require('../services/users.services');

const getExpenses = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  if (!req.query) {
    return res.status(400).send('Bad request');
  }

  const result = await expensesService.getAll(userId, categories, from, to);

  const normalizedExpenses = result.map(expensesService.normalized);

  res.status(200).send(normalizedExpenses);
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = await usersService.getById(userId);

  if (!userId || !spentAt || !title || !amount || !user) {
    return res.sendStatus(400);
  }

  const newExpense = await expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  if (!newExpense) {
    return res.status(400).send('Bad Request');
  }

  return res.status(201).send(expensesService.normalized(newExpense));
};

const getExpenseById = async (req, res) => {
  const expensId = Number(req.params.id);

  if (Number.isNaN(expensId)) {
    return res.status(400).send('Bad Request');
  }

  const searchedExpense = await expensesService.getById(expensId);

  if (!searchedExpense) {
    return res.status(404).send('Not Found');
  }

  res.status(200).send(expensesService.normalized(searchedExpense));
};

const deletExpense = async (req, res) => {
  const expenseId = Number(req.params.id);

  const deletedExpense = await expensesService.remove(expenseId);

  if (!deletedExpense) {
    return res.status(404).send('Not Found');
  }

  res.status(204).send();
};

const updateExpense = async (req, res) => {
  const expenseId = Number(req.params.id);

  if (Number.isNaN(expenseId)) {
    return res.status(400).send('Bad Request');
  }

  const updatedExpense = await expensesService.update(expenseId, req.body);

  if (!updatedExpense) {
    return res.status(404).send('Not Found');
  }

  res.status(200).send(expensesService.normalized(updatedExpense));
};

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  deletExpense,
  updateExpense,
};
