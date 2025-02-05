const Expenses = require("../models/expensesModel");
const User = require("../models/userModel");

const getExpenses = async (req, res) => {
  const { _id, expense_period } = req.params;

  try {
    userQuery = await User.findById(_id).populate("expense");

    let userExpenses = userQuery.expense.map((rev) => rev.toObject());

    if (expense_period) {
      // temp array to hold period specific data
      let periodExpenseData = [];

      for (let i = 0; i < userExpenses.length; i++) {
        if (userExpenses[i].expense_period == expense_period) {
          periodExpenseData.push(userExpenses[i]);
        }
      }

      // Empties userExpenses before filling it with new filtered list
      userExpenses.length = [];
      userExpenses = periodExpenseData;
    }
    let user = [{ expenses: userExpenses }];

    let total = 0;
    for (let i = 0; i < userExpenses.length; i++) {
      console.log(userExpenses[i]);
      total += userExpenses[i].expense_amt;
    }
    user.push({ totalExpenses: total });

    res.json(user);
  } catch (err) {
    console.log("Error fetching user revenues", err);
  }
};

const postExpense = async (req, res) => {
  const { _id, expense_period, expense_name, expense_amt } = req.body;

  try {
    const expense = new Expenses({
      expense_period: expense_period,
      expense_name: expense_name,
      expense_amt: expense_amt,
    });
    await expense.save();

    const user = await User.findById(_id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.expense.push(expense._id);
    await user.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteExpense = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedExpense = await Expenses.findByIdAndDelete(_id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "item not found" });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getExpenses,
  postExpense,
  deleteExpense,
};
