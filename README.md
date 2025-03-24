# AptosDeFAI
Move AI Hackathon


# AptosDeFAI

## Overview
AptosDeFAI is an **AI-powered autonomous DeFi management platform** built on the **Aptos blockchain**. It leverages AI agents to optimize yield farming, portfolio rebalancing, and risk-adjusted asset allocation across multiple DeFi protocols. This enables users to manage their digital assets effortlessly without constant manual intervention.

## Features
- **Autonomous Portfolio Management** – AI agents dynamically adjust allocations across lending, staking, and liquidity pools.
- **Multi-Protocol Integration** – Supports lending platforms, DEX swaps, and staking protocols.
- **AI-Driven Trading Strategies** – Executes strategies based on real-time market data.
- **Security & Risk Management** – Protects against liquidation risks, impermanent loss, and market fluctuations.
- **User-Friendly Interface** – Dashboard for tracking portfolio performance and managing AI agents.

## Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/AptosDeFAI.git
cd AptosDeFAI
```

### **2️⃣ Set Up Smart Contracts**
```sh
cd AptosDeFAI
aptos move compile
aptos move test
aptos move publish
```

### **3️⃣ Backend Setup**
```sh
cd ../AptosDeFAI-backend
npm install
```

### **4️⃣ Set Up Environment Variables**
Create a `.env` file in `AptosDeFAI-backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1
PRIVATE_KEY=your_private_key
```

### **5️⃣ Run Backend Server**
```sh
npm start
```

### **6️⃣ Frontend Setup (Optional if integrated)**
```sh
cd ../AptosDeFAI-frontend
npm install
npm start
```

---

## API Endpoints
### **User Management**
| Method | Endpoint            | Description         |
|--------|---------------------|---------------------|
| POST   | /api/users/register | Register a user    |
| POST   | /api/users/login    | User login         |

### **AI Agent Management**
| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| POST   | /api/agents/create | Create AI Agent     |
| GET    | /api/agents/list   | List all AI Agents  |

### **Strategy Execution**
| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| POST   | /api/strategy/update  | Update AI Strategy  |
| GET    | /api/strategy/execute | Execute Strategy    |

### **Transaction Handling**
| Method | Endpoint               | Description                  |
|--------|------------------------|------------------------------|
| GET    | /api/transactions/all  | List all transactions       |
| POST   | /api/transactions/send | Send transaction to Aptos   |

---


## License
This project is licensed under the **MIT License**.

---

