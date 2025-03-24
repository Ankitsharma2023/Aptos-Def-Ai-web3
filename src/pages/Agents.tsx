import React from 'react';
import { 
  Bot, 
  Plus, 
  Zap, 
  Shield, 
  RefreshCw, 
  DollarSign,
  Brain,
  ArrowRight,
  Play,
  Pause,
  Settings
} from 'lucide-react';

const Agents = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">AI Agents</h1>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors flex items-center">
          <Plus size={16} className="mr-2" />
          Deploy New Agent
        </button>
      </div>
      
      {/* Agent Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">Active Agents</div>
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <Bot size={16} className="text-indigo-400" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">5</div>
          <div className="mt-1 flex items-center text-xs">
            <span className="text-gray-400">of 8 total agents</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">Transactions</div>
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <RefreshCw size={16} className="text-indigo-400" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">247</div>
          <div className="mt-1 flex items-center text-xs">
            <span className="text-green-400">+32</span>
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
            <span className="text-green-400">+12.3%</span>
            <span className="text-gray-500 ml-1">vs. manual</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">Agent Performance</div>
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <Brain size={16} className="text-indigo-400" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-white">92.7%</div>
          <div className="mt-1 flex items-center text-xs">
            <span className="text-green-400">+3.5%</span>
            <span className="text-gray-500 ml-1">last month</span>
          </div>
        </div>
      </div>
      
      {/* Active Agents */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Active Agents</h2>
          <div className="flex items-center space-x-2">
            <select className="bg-gray-700 border border-gray-600 rounded-lg py-1 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent">
              <option>All Types</option>
              <option>Yield</option>
              <option>Risk</option>
              <option>Rebalance</option>
              <option>Arbitrage</option>
            </select>
            <button className="text-indigo-400 text-sm flex items-center hover:text-indigo-300 transition-colors">
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-700">
                <th className="pb-3 font-medium">Agent</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Transactions</th>
                <th className="pb-3 font-medium">Success Rate</th>
                <th className="pb-3 font-medium">Last Active</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-yellow-900/30 rounded-lg mr-3">
                      <Zap size={16} className="text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Yield Optimizer</div>
                      <div className="text-xs text-gray-400">v1.2.0</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full">
                    Yield
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-400">Active</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-white">87</td>
                <td className="py-4 pr-4 text-green-400">98.2%</td>
                <td className="py-4 pr-4 text-gray-400">10 minutes ago</td>
                <td className="py-4 text-right">
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Pause size={14} />
                    </button>
                    <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Settings size={14} />
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-blue-900/30 rounded-lg mr-3">
                      <Shield size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Risk Manager</div>
                      <div className="text-xs text-gray-400">v1.0.5</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full">
                    Risk
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-400">Active</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-white">42</td>
                <td className="py-4 pr-4 text-green-400">95.7%</td>
                <td className="py-4 pr-4 text-gray-400">3 hours ago</td>
                <td className="py-4 text-right">
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Pause size={14} />
                    </button>
                    <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Settings size={14} />
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-green-900/30 rounded-lg mr-3">
                      <RefreshCw size={16} className="text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Portfolio Rebalancer</div>
                      <div className="text-xs text-gray-400">v1.1.2</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                    Rebalance
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-400">Active</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-white">65</td>
                <td className="py-4 pr-4 text-green-400">94.3%</td>
                <td className="py-4 pr-4 text-gray-400">1 day ago</td>
                <td className="py-4 text-right">
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Pause size={14} />
                    </button>
                    <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Settings size={14} />
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-pink-900/30 rounded-lg mr-3">
                      <DollarSign size={16} className="text-pink-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Arbitrage Bot</div>
                      <div className="text-xs text-gray-400">v0.9.8</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-pink-900/30 text-pink-400 rounded-full">
                    Arbitrage
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-400">Active</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-white">53</td>
                <td className="py-4 pr-4 text-yellow-400">89.2%</td>
                <td className="py-4 pr-4 text-gray-400">5 hours ago</td>
                <td className="py-4 text-right">
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Pause size={14} />
                    </button>
                    <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Settings size={14} />
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-purple-900/30 rounded-lg mr-3">
                      <Brain size={16} className="text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Token Launch Agent</div>
                      <div className="text-xs text-gray-400">v0.8.3</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-400 rounded-full">
                    Launch
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-yellow-400">Standby</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-white">0</td>
                <td className="py-4 pr-4 text-gray-400">N/A</td>
                <td className="py-4 pr-4 text-gray-400">Never</td>
                <td className="py-4 text-right">
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Play size={14} />
                    </button>
                    <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Settings size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Agent Templates */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Agent Templates</h2>
          <button className="text-indigo-400 text-sm flex items-center hover:text-indigo-300 transition-colors">
            Browse All <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5 hover:border-indigo-500 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-yellow-900/30 rounded-full">
                <Zap size={20} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Yield Optimizer</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Automatically allocates assets across multiple yield-generating protocols to maximize returns.
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">Popular</span>
              <button className="text-xs text-indigo-400 hover:text-indigo-300">Deploy</button>
            </div>
          </div>
          
          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5 hover:border-indigo-500 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-900/30 rounded-full">
                <Shield size={20} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Risk Manager</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Monitors market conditions and portfolio risk, taking action to protect assets during volatility.
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">Essential</span>
              <button className="text-xs text-indigo-400 hover:text-indigo-300">Deploy</button>
            </div>
          </div>
          
          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5 hover:border-indigo-500 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-900/30 rounded-full">
                <RefreshCw size={20} className="text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Portfolio Rebalancer</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Maintains optimal asset allocation by automatically rebalancing portfolio when drift occurs.
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">Recommended</span>
              <button className="text-xs text-indigo-400 hover:text-indigo-300">Deploy</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Agent Performance */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Agent Performance Metrics</h2>
          <select className="bg-gray-700 border border-gray-600 rounded-lg py-1 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 24 Hours</option>
            <option>All Time</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-700">
                <th className="pb-3 font-medium">Agent</th>
                <th className="pb-3 font-medium">Transactions</th>
                <th className="pb-3 font-medium">Success Rate</th>
                <th className="pb-3 font-medium">Gas Used</th>
                <th className="pb-3 font-medium">Gas Saved</th>
                <th className="pb-3 font-medium">Value Generated</th>
                <th className="pb-3 font-medium">ROI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-yellow-900/30 rounded-lg mr-3">
                      <Zap size={16} className="text-yellow-400" />
                    </div>
                    <span className="text-white">Yield Optimizer</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-white">87</td>
                <td className="py-4 pr-4 text-green-400">98.2%</td>
                <td className="py-4 pr-4 text-white">325 APT</td>
                <td className="py-4 pr-4 text-green-400">485 APT</td>
                <td className="py-4 pr-4 text-white">$3,245.50</td>
                <td className="py-4 pr-4 text-green-400">+12.8%</td>
              </tr>
              
              <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-blue-900/30 rounded-lg mr-3">
                      <Shield size={16} className="text-blue-400" />
                    </div>
                    <span className="text-white">Risk Manager</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-white">42</td>
                <td className="py-4 pr-4 text-green-400">95.7%</td>
                <td className="py-4 pr-4 text-white">185 APT</td>
                <td className="py-4 pr-4 text-green-400">275 APT</td>
                <td className="py-4 pr-4 text-white">$1,850.25</td>
                <td className="py-4 pr-4 text-green-400">+8.5%</td>
              </tr>
              
              <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-green-900/30 rounded-lg mr-3">
                      <RefreshCw size={16} className="text-green-400" />
                    </div>
                    <span className="text-white">Portfolio Rebalancer</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-white">65</td>
                <td className="py-4 pr-4 text-green-400">94.3%</td>
                <td className="py-4 pr-4 text-white">245 APT</td>
                <td className="py-4 pr-4 text-green-400">320 APT</td>
                <td className="py-4 pr-4 text-white">$2,150.75</td>
                <td className="py-4 pr-4 text-green-400">+9.2%</td>
              </tr>
              
              <tr className="hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-pink-900/30 rounded-lg mr-3">
                      <DollarSign size={16} className="text-pink-400" />
                    </div>
                    <span className="text-white">Arbitrage Bot</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-white">53</td>
                <td className="py-4 pr-4 text-yellow-400">89.2%</td>
                <td className="py-4 pr-4 text-white">215 APT</td>
                <td className="py-4 pr-4 text-green-400">165 APT</td>
                <td className="py-4 pr-4 text-white">$1,750.50</td>
                <td className="py-4 pr-4 text-green-400">+15.2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Agents;