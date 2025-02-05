const mongoose = require("mongoose")
const Schema = mongoose.Schema

const revenueSchema = new Schema({
    rev_period: {
        type: String,
        required: true,
    },
    rev_name: {
        type: String,
        required: true,
    },
    rev_amt: {
        type: Number,
        required: true,
    },
})

const Revenue = mongoose.model("Revenue", revenueSchema)
module.exports = Revenue
