import React from 'react';
import { 
  Database, 
  Plus, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Search
} from 'lucide-react';

const Protocols = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Upcoming Integrations</h2>
          <button className="text-indigo-400 text-sm flex items-center hover:text-indigo-300 transition-colors">
            View All <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-1.5 bg-indigo-900/30 rounded-full">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
              </div>
              <div>
                <div className="font-medium text-white">Abel Finance</div>
                <div className="text-xs text-gray-400">abel.finance</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xs px-2 py-1 bg-indigo-900/30 text-indigo-400 rounded-full">
                Derivatives
              </span>
              <span className="text-xs px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full">
                In Progress
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Options and perpetuals trading platform built on Aptos.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Est. completion: 2 weeks</span>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center">
                Details <ExternalLink size={12} className="ml-1" />
              </button>
            </div>
          </div>
          
          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-1.5 bg-blue-900/30 rounded-full">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
              </div>
              <div>
                <div className="font-medium text-white">Solaris</div>
                <div className="text-xs text-gray-400">solaris.finance</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full">
                Yield Aggregator
              </span>
              <span className="text-xs px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full">
                In Progress
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Auto-compounding yield aggregator with optimized strategies.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Est. completion: 1 week</span>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center">
                Details <ExternalLink size={12} className="ml-1" />
              </button>
            </div>
          </div>
          
          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-5">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-1.5 bg-green-900/30 rounded-full">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
              </div>
              <div>
                <div className="font-medium text-white">Pyth Network</div>
                <div className="text-xs text-gray-400">pyth.network</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                Oracle
              </span>
              <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-400 rounded-full">
                Planning
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              High-performance oracle delivering real-time market data.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Est. completion: 4 weeks</span>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center">
                Details <ExternalLink size={12} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Protocol Health */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Protocol Health Monitoring</h2>
          <select className="bg-gray-700 border border-gray-600 rounded-lg py-1 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-700">
                <th className="pb-3 font-medium">Protocol</th>
                <th className="pb-3 font-medium">Uptime</th>
                <th className="pb-3 font-medium">Response Time</th>
                <th className="pb-3 font-medium">Transaction Success</th>
                <th className="pb-3 font-medium">TVL Change</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-blue-900/30 rounded-full mr-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">L</span>
                      </div>
                    </div>
                    <span className="text-white">Liquidswap</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-green-400">99.98%</td>
                <td className="py-4 pr-4 text-white">245ms</td>
                <td className="py-4 pr-4 text-green-400">99.7%</td>
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <TrendingUp size={14} className="text-green-400 mr-1" />
                    <span className="text-green-400">+2.3%</span>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                    Healthy
                  </span>
                </td>
              </tr>
              
              <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-purple-900/30 rounded-full mr-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">D</span>
                      </div>
                    </div>
                    <span className="text-white">Ditto Finance</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-green-400">99.95%</td>
                <td className="py-4 pr-4 text-white">312ms</td>
                <td className="py-4 pr-4 text-green-400">99.5%</td>
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <TrendingUp size={14} className="text-green-400 mr-1" />
                    <span className="text-green-400">+1.8%</span>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                    Healthy
                  </span>
                </td>
              </tr>
              
              <tr className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-green-900/30 rounded-full mr-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">A</span>
                      </div>
                    </div>
                    <span className="text-white">Aries Markets</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-green-400">100%</td>
                <td className="py-4 pr-4 text-white">198ms</td>
                <td className="py-4 pr-4 text-green-400">99.9%</td>
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <TrendingUp size={14} className="text-green-400 mr-1" />
                    <span className="text-green-400">+3.5%</span>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                    Healthy
                  </span>
                </td>
              </tr>
              
              <tr className="hover:bg-gray-800/30">
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-red-900/30 rounded-full mr-3">
                      <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">E</span>
                      </div>
                    </div>
                    <span className="text-white">Econia</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-yellow-400">98.75%</td>
                <td className="py-4 pr-4 text-white">425ms</td>
                <td className="py-4 pr-4 text-yellow-400">97.2%</td>
                <td className="py-4 pr-4">
                  <div className="flex items-center">
                    <TrendingDown size={14} className="text-red-400 mr-1" />
                    <span className="text-red-400">-0.8%</span>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-xs px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full flex items-center">
                    <AlertTriangle size={10} className="mr-1" /> Warning
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Protocols;