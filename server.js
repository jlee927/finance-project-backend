require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");

// external routes
// const userRoutes = require("./routes/user");
const revenueRoutes = require("./routes/revenue");
// const expensesRoutes = require("./routes/expenses");
// const savingsRoutes = require("./routes/savings");
// const spendingsRoutes = require("./routes/spending");
// const dashboardRoutes = require("./routes/dashboard");

const mongoose = require("mongoose");
const dbURI = process.env.MONGO_URI;
// app.use(cors());
// app.use(express.json());
//
// // routes
// app.use("/api/user", userRoutes);
// app.use("/data", revenueRoutes);
// app.use("/data", expensesRoutes);
// app.use("/data", savingsRoutes);
// app.use("/data", spendingsRoutes);
// app.use("/data", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
