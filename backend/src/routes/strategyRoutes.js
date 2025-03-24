const express = require("express");
const { executeStrategy, updateStrategy } = require("../controllers/strategyController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/execute", authMiddleware, executeStrategy);
router.put("/update", authMiddleware, updateStrategy);

module.exports = router;

