const AIAgent = require("../models/AI_Agent");

exports.createAgent = async (req, res) => {
  try {
    const { strategy, allocation } = req.body;
    const userId = req.user.id;

    const agent = await AIAgent.create({ userId, strategy, allocation });
    res.status(201).json(agent);
  } catch (error) {
    res.status(400).json({ message: "Agent creation failed" });
  }
};

exports.getUserAgents = async (req, res) => {
  try {
    const userId = req.user.id;
    const agents = await AIAgent.find({ userId });
    res.json(agents);
  } catch (error) {
    res.status(400).json({ message: "Error fetching agents" });
  }
};

