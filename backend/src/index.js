const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/agents", require("./src/routes/agentRoutes"));
app.use("/api/strategies", require("./src/routes/strategyRoutes"));
app.use("/api/transactions", require("./src/routes/transactionRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

