const express = require("express")
const router = express.Router()

const {
    getExpenses,
    postExpense,
    deleteExpense,
} = require("../controllers/expensesController")

router.get("/get-expenses/:_id/:expense_period?", getExpenses)
router.post("/post-expense", postExpense)
router.delete("/delete-expense/:_id", deleteExpense)

module.exports = router
