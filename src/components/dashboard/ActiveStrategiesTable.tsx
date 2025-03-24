import React from 'react';
import { TrendingUp, TrendingDown, MoreVertical, Shield, Zap, RefreshCw } from 'lucide-react';

const ActiveStrategiesTable = () => {
  const strategies = [
    {
      id: 1,
      name: 'Yield Optimizer Alpha',
      type: 'Yield',
      icon: <Zap size={16} className="text-yellow-400" />,
      protocols: ['Liquidswap', 'Ditto Finance'],
      tvl: 45250.75,
      apy: 12.8,
      performance: 8.3,
      risk: 'Medium',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Stable Coin Maximizer',
      type: 'Stablecoin',
      icon: <Shield size={16} className="text-blue-400" />,
      protocols: ['Aries Markets', 'Thala'],
      tvl: 32150.50,
      apy: 8.5,
      performance: 4.2,
      risk: 'Low',
      status: 'Active',
    },
    {
      id: 3,
      name: 'APT/USDC LP Strategy',
      type: 'Liquidity',
      icon: <RefreshCw size={16} className="text-green-400" />,
      protocols: ['Pancake Swap', 'Liquidswap'],
      tvl: 28750.25,
      apy: 15.2,
      performance: -2.1,
      risk: 'High',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Automated Delta Neutral',
      type: 'Delta Neutral',
      icon: <Shield size={16} className="text-purple-400" />,
      protocols: ['Econia', 'Ditto Finance'],
      tvl: 18417.90,
      apy: 9.7,
      performance: 3.5,
      risk: 'Medium',
      status: 'Active',
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-gray-400 border-b border-gray-700">
            <th className="pb-3 font-medium">Strategy</th>
            <th className="pb-3 font-medium">Protocols</th>
            <th className="pb-3 font-medium">TVL</th>
            <th className="pb-3 font-medium">APY</th>
            <th className="pb-3 font-medium">Performance</th>
            <th className="pb-3 font-medium">Risk</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {strategies.map((strategy) => (
            <tr key={strategy.id} className="border-b border-gray-800 hover:bg-gray-800/30">
              <td className="py-4 pr-4">
                <div className="flex items-center">
                  <div className="p-1.5 bg-gray-700 rounded-lg mr-3">
                    {strategy.icon}
                  </div>
                  <div>
                    <div className="font-medium text-white">{strategy.name}</div>
                    <div className="text-xs text-gray-400">{strategy.type}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 pr-4">
                <div className="flex flex-wrap gap-1">
                  {strategy.protocols.map((protocol, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">
                      {protocol}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-4 pr-4 text-white">${strategy.tvl.toLocaleString()}</td>
              <td className="py-4 pr-4 text-green-400">{strategy.apy}%</td>
              <td className="py-4 pr-4">
                <div className="flex items-center">
                  {strategy.performance >= 0 ? (
                    <>
                      <TrendingUp size={14} className="text-green-400 mr-1" />
                      <span className="text-green-400">{strategy.performance}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={14} className="text-red-400 mr-1" />
                      <span className="text-red-400">{strategy.performance}%</span>
                    </>
                  )}
                </div>
              </td>
              <td className="py-4 pr-4">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  strategy.risk === 'Low' ? 'bg-green-900/30 text-green-400' :
                  strategy.risk === 'Medium' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-red-900/30 text-red-400'
                }`}>
                  {strategy.risk}
                </span>
              </td>
              <td className="py-4 pr-4">
                <span className="text-xs px-2 py-1 bg-indigo-900/30 text-indigo-400 rounded-full">
                  {strategy.status}
                </span>
              </td>
              <td className="py-4 text-right">
                <button className="p-1 text-gray-400 hover:text-white">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveStrategiesTable;