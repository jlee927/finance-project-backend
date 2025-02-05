const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
  expense_period: {
    type: String,
    required: true,
  },
  expense_name: {
    type: String,
    required: true,
  },
  expense_amt: {
    type: Number,
    required: true,
  },
});

const Expenses = mongoose.model("Expenses", expensesSchema);
module.exports = Expenses;

