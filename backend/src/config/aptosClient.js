const { AptosClient } = require("aptos");

const APTOS_NODE_URL = process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com";

const aptosClient = new AptosClient(APTOS_NODE_URL);

module.exports = aptosClient;

