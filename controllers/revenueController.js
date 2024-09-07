const User = require("../models/userModel");
const Revenue = require("../models/revenueModel");

const getRevenue = async (req, res) => {
   const { _id } = req.params;

   try {
      const user = await User.findById(_id).populate("revenue");

      if (!user) {
         console.log("User not found");
         return;
      }

      const userRevenues = user.revenue;
      // console.log("User Revenues:", userRevenues);
      res.json(userRevenues);

      return userRevenues;
   } catch (err) {
      console.log("Error fetching user revenues", err);
   }
};

const addRevenue = async (req, res) => {
   const { _id, rev_name, rev_amt, rev_freq, rev_date } = req.body;
   //    if (!userId || !rev_type || !rev_amt || !rev_freq) {
   //       return res.status(400).json({ error: "All fields must be filled" });
   //    }
   // console.log(_id, rev_name, rev_amt, rev_freq);
   console.log(rev_date)
   try {
      const revenue = new Revenue({
         rev_name: rev_name,
         rev_amt: rev_amt,
         rev_freq: rev_freq,
         rev_date: rev_date
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
