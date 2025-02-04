const express = require("express");
const { Client } = require("clashofclans.js");
require("dotenv").config();

const router = express.Router();
const client = new Client();

(async function () {
  try {
    await client.login({
      email: process.env.COC_EMAIL,
      password: process.env.COC_PASSWORD,
    });
    console.log("Successfully logged in to Clash of Clans API");
  } catch (error) {
    console.error("Failed to login to Clash of Clans API:", error.message);
  }
})();

router.post("/warlog", async (req, res) => {
  const { clanTag } = req.body;

  if (!clanTag) return res.status(400).json({ error: "Clan tag is required" });

  try {
    const warlog = await client.getClanWarLog(clanTag);
    if (!warlog || !warlog.length) {
      return res
        .status(404)
        .json({ error: "No warlog data found for this clan." });
    }
    res.json(warlog.slice(0, 10));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
