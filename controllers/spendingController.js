const User = require("../models/userModel");
const Spending = require("../models/spendingsModel");

const getSpendings = async (req, res) => {
  const { _id, spending_period } = req.params;

  try {
    let user = [];
    userQuery = await User.findById(_id).populate("spendings");
    // user.push(userQuery);

    if (!user) {
      console.log("User not found");
      return;
    }

    let userSpendings = userQuery.spendings.map((rev) => rev.toObject());

    // CHECKS FOR CASE WHEN spending_period is given
    if (spending_period) {
      let newSpendingData = [];

      for (let i = 0; i < userSpendings.length; i++) {
        if (userSpendings[i].spending_period == spending_period) {
          console.log(userSpendings[i]);
          newSpendingData.push(userSpendings[i]);
        }
      }
      userSpendings.length = [];
      userSpendings = newSpendingData;
    }

    user.push({ spendings: userSpendings });

    // add total spendings to json before sending it
    let totalSpending = 0;
    for (let i = 0; i < userSpendings.length; i++) {
      totalSpending += userSpendings[i].spending_amt;
    }
    user.push({ spending_total: totalSpending });
    console.log("Total Spending: ", totalSpending);

    res.json(user);

    return userSpendings;
  } catch (err) {
    console.log("Error fetching user spending", err);
  }
};

const postSpending = async (req, res) => {
  const { _id, spending_period, spending_name, spending_amt } = req.body;

  try {
    const spendings = new Spending({
      spending_period: spending_period,
      spending_name: spending_name,
      spending_amt: spending_amt,
    });
    await spendings.save();

    const user = await User.findById(_id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.spendings.push(spendings._id);
    await user.save();
    res.status(201).json(spendings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSpending = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedSpendings = await Spending.findByIdAndDelete(_id);

    if (!deletedSpendings) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item found and deleted" });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getSpendings,
  postSpending,
  deleteSpending,
};
