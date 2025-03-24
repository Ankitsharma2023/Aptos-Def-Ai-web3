const AIAgent = require("../models/AI_Agent");

exports.executeStrategy = async (req, res) => {
  try {
    const { agentId } = req.body;
    const agent = await AIAgent.findById(agentId);

    if (!agent) return res.status(404).json({ message: "Agent not found" });

    // Placeholder: AI model execution logic here
    const result = `Executing ${agent.strategy} strategy with ${agent.allocation}% allocation`;

    res.json({ message: result });
  } catch (error) {
    res.status(400).json({ message: "Strategy execution failed" });
  }
};

exports.updateStrategy = async (req, res) => {
  try {
    const { agentId, newStrategy, newAllocation } = req.body;
    const agent = await AIAgent.findByIdAndUpdate(
      agentId,
      { strategy: newStrategy, allocation: newAllocation },
      { new: true }
    );

    if (!agent) return res.status(404).json({ message: "Agent not found" });

    res.json(agent);
  } catch (error) {
    res.status(400).json({ message: "Failed to update strategy" });
  }
};

