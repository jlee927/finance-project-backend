const express = require("express");
const router = express.Router();

const {
  getSpendings,
  postSpending,
  deleteSpending,
} = require("../controllers/spendingController");

router.get("/get-spendings/:_id/:spending_period?", getSpendings);
router.post("/post-spending", postSpending);
router.delete("/delete-spending/:_id", deleteSpending);

module.exports = router;
