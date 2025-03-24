import React, { useState } from 'react';
import { 
  Plus, 
  Workflow, 
  ArrowRight, 
  Zap, 
  Shield, 
  RefreshCw, 
  DollarSign,
  Sliders,
  Save,
  PlayCircle
} from 'lucide-react';

const StrategyBuilder = () => {
  const [activeTab, setActiveTab] = useState('templates');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Strategy Builder</h1>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors flex items-center">
          <Plus size={16} className="mr-2" />
          New Strategy
        </button>
      </div>
      
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
        <div className="border-b border-gray-700">
          <div className="flex">
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'templates'
                  ? 'text-white border-b-2 border-indigo-500'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('templates')}
            >
              Strategy Templates
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'custom'
                  ? 'text-white border-b-2 border-indigo-500'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('custom')}
            >
              Custom Builder
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'saved'
                  ? 'text-white border-b-2 border-indigo-500'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('saved')}
            >
              Saved Strategies
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'templates' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5 hover:border-indigo-500 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-yellow-900/30 rounded-full">
                    <Zap size={20} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Yield Optimizer</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Automatically allocates assets across multiple yield-generating protocols to maximize returns while managing risk.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full">APY: 8-15%</span>
                    <span className="text-xs px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full">Medium Risk</span>
                  </div>
                  <ArrowRight size={16} className="text-indigo-400" />
                </div>
              </div>
              
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5 hover:border-indigo-500 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-900/30 rounded-full">
                    <Shield size={20} className="text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Stablecoin Yield</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Focuses on generating yield from stablecoin deposits across lending protocols with minimal risk exposure.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">APY: 5-10%</span>
                    <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">Low Risk</span>
                  </div>
                  <ArrowRight size={16} className="text-indigo-400" />
                </div>
              </div>
              
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5 hover:border-indigo-500 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-900/30 rounded-full">
                    <RefreshCw size={20} className="text-green-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">LP Optimizer</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Manages liquidity positions across DEXs, automatically rebalancing to optimize fees and incentive rewards.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 bg-red-900/30 text-red-400 rounded-full">APY: 15-25%</span>
                    <span className="text-xs px-2 py-1 bg-red-900/30 text-red-400 rounded-full">High Risk</span>
                  </div>
                  <ArrowRight size={16} className="text-indigo-400" />
                </div>
              </div>
              
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5 hover:border-indigo-500 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-900/30 rounded-full">
                    <Shield size={20} className="text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Delta Neutral</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Creates market-neutral positions that generate yield regardless of market direction through hedged positions.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full">APY: 8-12%</span>
                    <span className="text-xs px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full">Medium Risk</span>
                  </div>
                  <ArrowRight size={16} className="text-indigo-400" />
                </div>
              </div>
              
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5 hover:border-indigo-500 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-pink-900/30 rounded-full">
                    <DollarSign size={20} className="text-pink-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Arbitrage Bot</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Automatically identifies and executes arbitrage opportunities across DEXs to capture price differences.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 bg-red-900/30 text-red-400 rounded-full">APY: Variable</span>
                    <span className="text-xs px-2 py-1 bg-red-900/30 text-red-400 rounded-full">High Risk</span>
                  </div>
                  <ArrowRight size={16} className="text-indigo-400" />
                </div>
              </div>
              
              <div className="bg-indigo-900/30 border border-indigo-800/50 rounded-lg p-5 flex items-center justify-center cursor-pointer hover:bg-indigo-900/50 transition-colors">
                <div className="text-center">
                  <div className="p-3 bg-indigo-900/50 rounded-full inline-flex mb-3">
                    <Plus size={24} className="text-indigo-400" />
                  </div>
                  <p className="text-indigo-300 font-medium">Create Custom Strategy</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'custom' && (
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Strategy Configuration</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Strategy Name</label>
                    <input
                      type="text"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="My Custom Strategy"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Risk Level</label>
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Initial Investment</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="1000"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Target APY</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="12"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Protocol Allocation</h3>
                  <button className="text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center">
                    <Plus size={14} className="mr-1" />
                    Add Protocol
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-blue-900/30 rounded-full">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">L</span>
                          </div>
                        </div>
                        <span className="font-medium text-white">Liquidswap</span>
                      </div>
                      <select className="bg-gray-700 border border-gray-600 rounded-lg py-1 px-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent">
                        <option>APT/USDC Pool</option>
                        <option>APT/USDT Pool</option>
                        <option>BTC/USDC Pool</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400 mr-3 w-24">Allocation:</span>
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="40"
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <span className="text-white ml-3 w-12">40%</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-purple-900/30 rounded-full">
                          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">D</span>
                          </div>
                        </div>
                        <span className="font-medium text-white">Ditto Finance</span>
                      </div>
                      <select className="bg-gray-700 border border-gray-600 rounded-lg py-1 px-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent">
                        <option>USDC Lending</option>
                        <option>APT Lending</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400 mr-3 w-24">Allocation:</span>
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="30"
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <span className="text-white ml-3 w-12">30%</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-green-900/30 rounded-full">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">A</span>
                          </div>
                        </div>
                        <span className="font-medium text-white">Aries Markets</span>
                      </div>
                      <select className="bg-gray-700 border border-gray-600 rounded-lg py-1 px-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent">
                        <option>Stablecoin Vault</option>
                        <option>APT Vault</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400 mr-3 w-24">Allocation:</span>
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="30"
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <span className="text-white ml-3 w-12">30%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Automation Rules</h3>
                  <button className="text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center">
                    <Plus size={14} className="mr-1" />
                    Add Rule
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Sliders size={16} className="text-indigo-400" />
                        <span className="font-medium text-white">Rebalance Condition</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <select className="bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent">
                        <option>Portfolio Drift</option>
                        <option>APY Change</option>
                        <option>Price Change</option>
                      </select>
                      <select className="bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent">
                        <option>Exceeds</option>
                        <option>Falls Below</option>
                      </select>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 pl-3 pr-8 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="5"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-400">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Shield size={16} className="text-indigo-400" />
                        <span className="font-medium text-white">Risk Management</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <select className="bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent">
                        <option>Volatility</option>
                        <option>Drawdown</option>
                        <option>Impermanent Loss</option>
                      </select>
                      <select className="bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent">
                        <option>Exceeds</option>
                        <option>Falls Below</option>
                      </select>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 pl-3 pr-8 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="10"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-400">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center">
                  <Save size={16} className="mr-2" />
                  Save Draft
                </button>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center">
                  <PlayCircle size={16} className="mr-2" />
                  Deploy Strategy
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'saved' && (
            <div className="space-y-4">
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5 hover:border-indigo-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-900/30 rounded-full">
                      <Zap size={16} className="text-yellow-400" />
                    </div>
                    <h3 className="font-medium text-white">Custom Yield Strategy</h3>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded-full">Draft</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-gray-500">Risk Level</div>
                    <div className="text-sm text-white">Medium</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Target APY</div>
                    <div className="text-sm text-white">12%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Last Modified</div>
                    <div className="text-sm text-white">2 days ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full">Liquidswap</span>
                  <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-400 rounded-full">Ditto Finance</span>
                  <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">Aries Markets</span>
                </div>
              </div>
              
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5 hover:border-indigo-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-900/30 rounded-full">
                      <Shield size={16} className="text-blue-400" />
                    </div>
                    <h3 className="font-medium text-white">Stablecoin Safety</h3>
                  </div>
                  <span className="text-xs px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-full">Active</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-gray-500">Risk Level</div>
                    <div className="text-sm text-white">Low</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Current APY</div>
                    <div className="text-sm text-white">8.5%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Deployed</div>
                    <div className="text-sm text-white">1 week ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-400 rounded-full">Ditto Finance</span>
                  <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">Aries Markets</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrategyBuilder;