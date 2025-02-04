const express = require("express");
const { Client } = require("clashofclans.js");

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
  const { clantag } = req.body;

  if (!clantag) return res.status(400).json({ error: "Clan tag is required" });

  try {
    const warlog = await client.clanWarlog(clanTag);
    if (!warlog || !warlog.length) {
      return res
        .status(404)
        .json({ error: "No warlog data found for this clan." });
    }
    res.json(warlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
