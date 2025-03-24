const Transaction = require("../models/Transaction");
const aptosClient = require("../config/aptosClient");

exports.executeTransaction = async (req, res) => {
  try {
    const { userId, amount, type } = req.body;

    // Placeholder: Transaction execution logic with Aptos blockchain
    const txHash = "0x" + Math.random().toString(16).substr(2, 10); // Simulated TX hash

    const transaction = await Transaction.create({
      userId,
      txHash,
      amount,
      type,
      status: "Pending",
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: "Transaction failed" });
  }
};

exports.getUserTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ userId });

    res.json(transactions);
  } catch (error) {
    res.status(400).json({ message: "Error fetching transactions" });
  }
};

