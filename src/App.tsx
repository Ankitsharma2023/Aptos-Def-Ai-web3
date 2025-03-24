import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';

// Layout components
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import StrategyBuilder from './pages/StrategyBuilder';
import Analytics from './pages/Analytics';
import Agents from './pages/Agents';
import Protocols from './pages/Protocols';
import Settings from './pages/Settings';

const wallets = [
  new PetraWallet()
];

function App() {
  return (
    <AptosWalletAdapterProvider 
      plugins={wallets} 
      autoConnect={true}
    >
      <Router>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 text-white">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/strategy-builder" element={<StrategyBuilder />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/protocols" element={<Protocols />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </AptosWalletAdapterProvider>
  );
}

export default App;