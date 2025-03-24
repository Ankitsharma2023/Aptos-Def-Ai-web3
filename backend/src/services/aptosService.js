const aptosClient = require("../config/aptosClient");

exports.getAccount = async (address) => {
  try {
    const account = await aptosClient.getAccount(address);
    return account;
  } catch (error) {
    console.error("Error fetching account:", error);
    return null;
  }
};

