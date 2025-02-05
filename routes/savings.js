const express = require("express");
const router = express.Router();

const {
  getSavings,
  addSavings,
  deleteSavings,
} = require("../controllers/savingsController");

router.get("/get-savings/:_id/:savings_period?", getSavings);
router.post("/add-savings", addSavings);
router.delete("/delete-savings/:_id", deleteSavings);

module.exports = router;

