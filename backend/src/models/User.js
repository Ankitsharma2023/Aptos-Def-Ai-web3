const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  walletAddress: String,
  portfolio: { type: Array, default: [] },
});

module.exports = mongoose.model("User", UserSchema);

