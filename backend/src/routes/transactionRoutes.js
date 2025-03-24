const express = require("express");
const { executeTransaction, getUserTransactions } = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/execute", authMiddleware, executeTransaction);
router.get("/", authMiddleware, getUserTransactions);

module.exports = router;

