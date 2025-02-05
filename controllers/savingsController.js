const Savings = require("../models/savingsModel");
const User = require("../models/userModel");

const getSavings = async (req, res) => {
  const { _id, savings_period } = req.params;

  try {
    userQuery = await User.findById(_id).populate("savings");
    let userSavings = userQuery.savings.map((rev) => rev.toObject());

    if (savings_period) {
      // temp array to hold period specific data
      let periodSavingsData = [];

      for (let i = 0; i < userSavings.length; i++) {
        if (userSavings[i].savings_period == savings_period) {
          periodSavingsData.push(userSavings[i]);
        }
      }

      // Empties userExpenses before filling it with new filtered list
      userSavings.length = [];
      userSavings = periodSavingsData;
    }

    let user = [{ savings: userSavings }];

    let total = 0;
    for (let i = 0; i < userSavings.length; i++) {
      console.log(userSavings[i]);
      total += userSavings[i].savings_amt;
    }
    user.push({ totalSavings: total });

    res.json(user);
  } catch (err) {
    console.log("Error fetching user savings", err);
  }
};

const addSavings = async (req, res) => {
  const { _id, savings_period, savings_name, savings_amt } = req.body;

  try {
    const savings = new Savings({
      savings_period: savings_period,
      savings_name: savings_name,
      savings_amt: savings_amt,
    });
    await savings.save();

    const user = await User.findById(_id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.savings.push(savings._id);
    await user.save();
    res.status(201).json(savings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSavings = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedSavings = await Savings.findByIdAndDelete(_id);

    if (!deletedSavings) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item found and deleted" });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getSavings,
  addSavings,
  deleteSavings,
};
