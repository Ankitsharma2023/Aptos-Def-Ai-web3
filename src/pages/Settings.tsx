import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Lock, 
  User, 
  Wallet,
  Shield,
  Save,
  Globe,
  Moon,
  Sun
} from 'lucide-react';

const Settings = () => {
  const [theme, setTheme] = useState('dark');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors flex items-center">
          <Save size={16} className="mr-2" />
          Save Changes
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <nav className="space-y-1">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-white bg-indigo-900/50 rounded-lg">
                <User size={16} />
                <span>Account</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg">
                <Wallet size={16} />
                <span>Wallet</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg">
                <Bell size={16} />
                <span>Notifications</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg">
                <Shield size={16} />
                <span>Security</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg">
                <Globe size={16} />
                <span>Language</span>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your display name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Theme
                </label>
                <div className="flex space-x-4">
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      theme === 'light'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setTheme('light')}
                  >
                    <Sun size={16} />
                    <span>Light</span>
                  </button>
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon size={16} />
                    <span>Dark</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4">Security Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter current password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter new password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">Strategy Updates</h3>
                  <p className="text-xs text-gray-400">Get notified when your strategies need attention</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">Risk Alerts</h3>
                  <p className="text-xs text-gray-400">Receive alerts about potential risks in your portfolio</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">Performance Reports</h3>
                  <p className="text-xs text-gray-400">Weekly summary of your portfolio performance</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;