const mongoose = require("mongoose")
const Schema = mongoose.Schema

const savingsSchema = new Schema({
    savings_period: {
        type: String,
        required: true
    },
    savings_name: {
        type: String,
        required: true
    },
    savings_amt: {
        type: Number,
        required: true
    }
})

const Savings = mongoose.model("Savings", savingsSchema)
module.exports = Savings