const mongoose = require("mongoose");

const AIAgentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  strategy: String,
  allocation: Number,
  status: { type: String, default: "active" },
});

module.exports = mongoose.model("AIAgent", AIAgentSchema);

