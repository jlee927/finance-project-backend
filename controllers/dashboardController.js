const User = require("../models/userModel");

const getAllCategories = async (req, res) => {
  const { _id } = req.params;

  try {
    // Calcs user revenue total
    userQuery = await User.findById(_id).populate("revenue");
    let userRevenues = userQuery.revenue.map((rev) => rev.toObject());

    let totalRevenue = 0;
    for (let i = 0; i < userRevenues.length; i++) {
      totalRevenue += userRevenues[i].rev_amt;
    }
    let user = [{ revenues: userRevenues }, totalRevenue];

    // Calcs user expenses total
    userQuery = await User.findById(_id).populate("expense");
    let userExpenses = userQuery.expense.map((rev) => rev.toObject());

    total = 0;
    for (let i = 0; i < userExpenses.length; i++) {
      total += userExpenses[i].expense_amt;
    }
    user.push({ expenses: userExpenses }, total);

    // Calcs user savings total
    userQuery = await User.findById(_id).populate("savings");
    let userSavings = userQuery.savings.map((rev) => rev.toObject());

    total = 0;
    for (let i = 0; i < userSavings.length; i++) {
      console.log(userSavings[i]);
      total += userSavings[i].savings_amt;
    }
    user.push({ savings: userSavings }, total);

    res.json(user);
  } catch (err) {
    console.log("Error fetching all categories ", err);
  }
};

module.exports = {
  getAllCategories,
};
