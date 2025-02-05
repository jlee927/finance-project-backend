const User = require("../models/userModel");
const Revenue = require("../models/revenueModel");

const getRevenue = async (req, res) => {
  const { _id, rev_period } = req.params;

  try {
    let user = [];
    userQuery = await User.findById(_id).populate("revenue");
    // user.push(userQuery);

    if (!user) {
      console.log("User not found");
      return;
    }

    let userRevenues = userQuery.revenue.map((rev) => rev.toObject());

    // CHECKS FOR CASE WHEN rev_period is given
    if (rev_period) {
      let newRevenueData = [];

      for (let i = 0; i < userRevenues.length; i++) {
        if (userRevenues[i].rev_period == rev_period) {
          console.log(userRevenues[i]);
          newRevenueData.push(userRevenues[i]);
        }
      }
      userRevenues.length = [];
      userRevenues = newRevenueData;
    }

    user.push({ revenues: userRevenues });

    // add total revenue to json before sending it
    let totalRevenue = 0;
    for (let i = 0; i < userRevenues.length; i++) {
      totalRevenue += userRevenues[i].rev_amt;
    }
    user.push({ rev_total: totalRevenue });
    console.log("Total Revenue: ", totalRevenue);

    // console.log("User Revenues:", userRevenues);
    res.json(user);

    return userRevenues;
  } catch (err) {
    console.log("Error fetching user revenues", err);
  }
};

const addRevenue = async (req, res) => {
  const { _id, rev_period, rev_name, rev_amt } = req.body;

  try {
    const revenue = new Revenue({
      rev_period: rev_period,
      rev_name: rev_name,
      rev_amt: rev_amt,
    });
    await revenue.save();

    const user = await User.findById(_id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.revenue.push(revenue._id);
    await user.save();
    res.status(201).json(revenue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRevenue = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedRevenue = await Revenue.findByIdAndDelete(_id);

    if (!deletedRevenue) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "item not found" });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getRevenue,
  addRevenue,
  deleteRevenue,
};
