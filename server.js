require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const dbURI = process.env.MONGO_URI;
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);


app.get("/", (req, res) => {
   res.send("Hello world");
});

mongoose.connect(dbURI).then((result) => {
   app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
   });
});