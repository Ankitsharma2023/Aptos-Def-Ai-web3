const express = require("express");
const { createAgent, getUserAgents } = require("../controllers/agentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createAgent);
router.get("/", authMiddleware, getUserAgents);

module.exports = router;

