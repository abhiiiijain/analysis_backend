const mongoose = require("mongoose");

const clanTagSchema = new mongoose.Schema({
  clanTag: { type: String, unique: true, required: true },
  association: { type: String, enum: ["GFL", "FWL", "BL"], required: true },
  status: { type: String, enum: ["Active", "Inactive"], required: true },
});

module.exports = mongoose.model("ClanTag", clanTagSchema);
