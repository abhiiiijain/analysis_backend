const express = require("express");
const {
  getAllClanTags,
  createClanTag,
  deleteClanTag,
} = require("../controllers/clanTagController");

const router = express.Router();

router.get("/", getAllClanTags);
router.post("/", createClanTag);
router.delete("/:id", deleteClanTag);

module.exports = router;
