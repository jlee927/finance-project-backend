const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const revenueSchema = new Schema({
   rev_name: {
      type: String,
      required: true,
   },
   rev_amt: {
      type: Number,
      required: true,
   },
   rev_freq: {
      type: String,
      required: true,
    //   enum: ["weekly, bi-weeky, monthly, yearly"]
   },
   rev_date: {
      type: String,
      required: true
   }
});

const Revenue = mongoose.model("Revenue", revenueSchema);
module.exports = Revenue
