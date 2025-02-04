require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json()); // Middleware to parse JSON

const warlogRoutes = require("./routes/warlog");
app.use("/api", warlogRoutes); // Prefix routes with /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
