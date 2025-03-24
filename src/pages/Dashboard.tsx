import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent, 
  Activity,
  ArrowRight,
  RefreshCw,
  Shield,
  Zap
} from 'lucide-react';
import PortfolioChart from '../components/dashboard/PortfolioChart';
import ActiveStrategiesTable from '../components/dashboard/ActiveStrategiesTable';
import ProtocolDistribution from '../components/dashboard/ProtocolDistribution';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors flex items-center">
          <RefreshCw size={16} className="mr-2" />
          Refresh Data
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">Total Value Locked</div>
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <DollarSign size={16} className="text-indigo-400" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">$124,568.45</div>
          <div className="mt-1 flex items-center text-xs">
            <TrendingUp size={14} className="text-green-400 mr-1" />
            <span className="text-green-400">+5.23%</span>
            <span className="text-gray-500 ml-1">last 24h</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">Active Strategies</div>
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <Activity size={16} className="text-indigo-400" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">7</div>
          <div className="mt-1 flex items-center text-xs">
            <TrendingUp size={14} className="text-green-400 mr-1" />
            <span className="text-green-400">+2</span>
            <span className="text-gray-500 ml-1">last week</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">Total Yield</div>
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <Percent size={16} className="text-indigo-400" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">18.7%</div>
          <div className="mt-1 flex items-center text-xs">
            <TrendingDown size={14} className="text-red-400 mr-1" />
            <span className="text-red-400">-0.5%</span>
            <span className="text-gray-500 ml-1">last 24h</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">Gas Saved</div>
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <Zap size={16} className="text-indigo-400" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">1,245 APT</div>
          <div className="mt-1 flex items-center text-xs">
            <TrendingUp size={14} className="text-green-400 mr-1" />
            <span className="text-green-400">+12.3%</span>
            <span className="text-gray-500 ml-1">last month</span>
          </div>
        </div>
      </div>
      
      {/* Portfolio Chart */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Portfolio Performance</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-indigo-900/50 text-indigo-300 rounded-lg">1D</button>
            <button className="px-3 py-1 text-xs bg-indigo-600 text-white rounded-lg">1W</button>
            <button className="px-3 py-1 text-xs bg-indigo-900/50 text-indigo-300 rounded-lg">1M</button>
            <button className="px-3 py-1 text-xs bg-indigo-900/50 text-indigo-300 rounded-lg">1Y</button>
            <button className="px-3 py-1 text-xs bg-indigo-900/50 text-indigo-300 rounded-lg">ALL</button>
          </div>
        </div>
        <PortfolioChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Strategies */}
        <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Active Strategies</h2>
            <button className="text-indigo-400 text-sm flex items-center hover:text-indigo-300 transition-colors">
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <ActiveStrategiesTable />
        </div>
        
        {/* Protocol Distribution */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Protocol Distribution</h2>
          </div>
          <ProtocolDistribution />
        </div>
      </div>
      
      {/* AI Agent Insights */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">AI Agent Insights</h2>
          <button className="text-indigo-400 text-sm flex items-center hover:text-indigo-300 transition-colors">
            View All <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-green-900/30 rounded-full">
                <TrendingUp size={16} className="text-green-400" />
              </div>
              <span className="text-sm font-medium text-white">Yield Optimizer</span>
            </div>
            <p className="text-sm text-gray-400">
              Detected opportunity to increase yield by 2.3% by shifting liquidity from Liquidswap to Ditto Finance.
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">10 minutes ago</span>
              <button className="text-xs text-indigo-400 hover:text-indigo-300">Apply</button>
            </div>
          </div>
          
          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-yellow-900/30 rounded-full">
                <Shield size={16} className="text-yellow-400" />
              </div>
              <span className="text-sm font-medium text-white">Risk Manager</span>
            </div>
            <p className="text-sm text-gray-400">
              Market volatility detected in APT/USDC pair. Recommended to reduce exposure by 15% temporarily.
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">3 hours ago</span>
              <button className="text-xs text-indigo-400 hover:text-indigo-300">Review</button>
            </div>
          </div>
          
          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-blue-900/30 rounded-full">
                <RefreshCw size={16} className="text-blue-400" />
              </div>
              <span className="text-sm font-medium text-white">Portfolio Rebalancer</span>
            </div>
            <p className="text-sm text-gray-400">
              Portfolio drift detected. Recommended rebalancing to maintain optimal asset allocation.
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">1 day ago</span>
              <button className="text-xs text-indigo-400 hover:text-indigo-300">Rebalance</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;