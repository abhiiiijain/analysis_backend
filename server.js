const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const warlogRoutes = require("./routes/warlog");
const clanTagRoutes = require("./routes/clanTagRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", warlogRoutes);
app.use("/api/clantags", clanTagRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
