import React, { useState } from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search protocols, strategies, agents..."
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>
            
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                <div className="p-3 border-b border-gray-700">
                  <h3 className="text-sm font-medium text-white">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-3 border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer">
                    <div className="text-xs text-indigo-400">Strategy Update</div>
                    <div className="text-sm text-white">Yield optimization strategy rebalanced</div>
                    <div className="text-xs text-gray-500 mt-1">10 minutes ago</div>
                  </div>
                  <div className="p-3 border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer">
                    <div className="text-xs text-green-400">Transaction</div>
                    <div className="text-sm text-white">Liquidity position adjusted on Liquidswap</div>
                    <div className="text-xs text-gray-500 mt-1">1 hour ago</div>
                  </div>
                  <div className="p-3 hover:bg-gray-700/50 cursor-pointer">
                    <div className="text-xs text-yellow-400">Alert</div>
                    <div className="text-sm text-white">Market volatility detected in APT/USDC pair</div>
                    <div className="text-xs text-gray-500 mt-1">3 hours ago</div>
                  </div>
                </div>
                <div className="p-2 border-t border-gray-700">
                  <button className="w-full text-xs text-indigo-400 p-2 hover:bg-gray-700/50 rounded">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
              A
            </div>
            <span className="text-sm text-gray-300">0x7a...3f9e</span>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;