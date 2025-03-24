import React, { useState } from 'react';
import { 
  BarChart2, 
  Calendar, 
  Download, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Percent,
  Clock,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import PerformanceChart from '../components/analytics/PerformanceChart';
import StrategyComparison from '../components/analytics/StrategyComparison';
import RiskAnalysis from '../components/analytics/RiskAnalysis';

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('1m');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-gray-800 rounded-lg">
            <button
              className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                timeframe === '1d' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setTimeframe('1d')}
            >
              1D
            </button>
            <button
              className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                timeframe === '1w' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setTimeframe('1w')}
            >
              1W
            </button>
            <button
              className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                timeframe === '1m' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setTimeframe('1m')}
            >
              1M
            </button>
            <button
              className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                timeframe === '3m' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setTimeframe('3m')}
            >
              3M
            </button>
            <button
              className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                timeframe === 'all' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setTimeframe('all')}
            >
              ALL
            </button>
          </div>
          
          <button className="p-2 bg-gray-800 text-gray-400 hover:text-white rounded-lg">
            <Calendar size={16} />
          </button>
          
          <button className="p-2 bg-gray-800 text-gray-400 hover:text-white rounded-lg">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">Total Returns</div>
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <DollarSign size={16} className="text-indigo-400" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">$12,458.32</div>
          <div className="mt-1 flex items-center text-xs">
            <TrendingUp size={14} className="text-green-400 mr-1" />
            <span className="text-green-400">+10.2%</span>
            <span className="text-gray-500 ml-1">all time</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">Average APY</div>
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <Percent size={16} className="text-indigo-400" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">14.3%</div>
          <div className="mt-1 flex items-center text-xs">
            <TrendingUp size={14} className="text-green-400 mr-1" />
            <span className="text-green-400">+2.1%</span>
            <span className="text-gray-500 ml-1">vs. last month</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">Max Drawdown</div>
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <TrendingDown size={16} className="text-indigo-400" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">-5.8%</div>
          <div className="mt-1 flex items-center text-xs">
            <TrendingDown size={14} className="text-red-400 mr-1" />
            <span className="text-red-400">+1.2%</span>
            <span className="text-gray-500 ml-1">vs. benchmark</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">Time in Market</div>
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <Clock size={16} className="text-indigo-400" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">47 days</div>
          <div className="mt-1 flex items-center text-xs">
            <span className="text-gray-400">98.2% uptime</span>
          </div>
        </div>
      </div>
      
      {/* Performance Chart */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Performance Analysis</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-indigo-900/50 text-indigo-300 rounded-lg">Value</button>
            <button className="px-3 py-1 text-xs bg-indigo-600 text-white rounded-lg">Returns %</button>
            <button className="px-3 py-1 text-xs bg-indigo-900/50 text-indigo-300 rounded-lg">Benchmark</button>
          </div>
        </div>
        <PerformanceChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strategy Comparison */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Strategy Comparison</h2>
            <button className="text-indigo-400 text-sm flex items-center hover:text-indigo-300 transition-colors">
              View Details <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <StrategyComparison />
        </div>
        
        {/* Risk Analysis */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Risk Analysis</h2>
            <button className="text-indigo-400 text-sm flex items-center hover:text-indigo-300 transition-colors">
              View Details <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <RiskAnalysis />
        </div>
      </div>
      
      {/* Transaction History */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Transaction History</h2>
          <button className="text-indigo-400 text-sm flex items-center hover:text-indigo-300 transition-colors">
            View All <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-700">
                <th className="pb-3 font-medium">Transaction</th>
                <th className="pb-3 font-medium">Strategy</th>
                <th className="pb-3 font-medium">Protocol</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-green-900/30 rounded-lg mr-3">
                      <TrendingUp size={16} className="text-green-400" />
                    </div>
                    <div className="text-white">Deposit</div>
                  </div>
                </td>
                <td className="py-4 pr-4 text-gray-300">Yield Optimizer Alpha</td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full">
                    Liquidswap
                  </span>
                </td>
                <td className="py-4 pr-4 text-white">+$5,000.00</td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                    Completed
                  </span>
                </td>
                <td className="py-4 pr-4 text-gray-400">2 days ago</td>
                <td className="py-4 text-right">
                  <button className="text-xs text-indigo-400 hover:text-indigo-300">
                    View
                  </button>
                </td>
              </tr>
              
              <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-blue-900/30 rounded-lg mr-3">
                      <RefreshCw size={16} className="text-blue-400" />
                    </div>
                    <div className="text-white">Rebalance</div>
                  </div>
                </td>
                <td className="py-4 pr-4 text-gray-300">Yield Optimizer Alpha</td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-400 rounded-full">
                    Ditto Finance
                  </span>
                </td>
                <td className="py-4 pr-4 text-white">$2,500.00</td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                    Completed
                  </span>
                </td>
                <td className="py-4 pr-4 text-gray-400">3 days ago</td>
                <td className="py-4 text-right">
                  <button className="text-xs text-indigo-400 hover:text-indigo-300">
                    View
                  </button>
                </td>
              </tr>
              
              <tr className="hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-yellow-900/30 rounded-lg mr-3">
                      <DollarSign size={16} className="text-yellow-400" />
                    </div>
                    <div className="text-white">Yield Harvest</div>
                  </div>
                </td>
                <td className="py-4 pr-4 text-gray-300">Stable Coin Maximizer</td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                    Aries Markets
                  </span>
                </td>
                <td className="py-4 pr-4 text-white">+$320.45</td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                    Completed
                  </span>
                </td>
                <td className="py-4 pr-4 text-gray-400">5 days ago</td>
                <td className="py-4 text-right">
                  <button className="text-xs text-indigo-400 hover:text-indigo-300">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;