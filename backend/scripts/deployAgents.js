const AIAgent = require("../models/AI_Agent");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const deployAgents = async () => {
  try {
    const agents = await AIAgent.find();
    agents.forEach((agent) => {
      console.log(`Deploying AI Agent ${agent._id} with strategy ${agent.strategy}`);
      // Add Aptos blockchain deployment logic here
    });

    console.log("All agents deployed successfully.");
  } catch (error) {
    console.error("Error deploying agents:", error);
  } finally {
    mongoose.connection.close();
  }
};

deployAgents();
