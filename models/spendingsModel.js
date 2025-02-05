const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spendingSchema = new Schema({
  spending_period: {
    type: String,
    required: true,
  },
  spending_name: {
    type: String,
    required: true,
  },
  spending_amt: {
    type: Number,
    required: true,
  },
});

const Spendings = mongoose.model("Spendings", spendingSchema);
module.exports = Spendings;
