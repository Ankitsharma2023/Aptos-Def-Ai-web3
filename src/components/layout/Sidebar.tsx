import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Workflow, 
  BarChart2, 
  Bot, 
  Database, 
  Settings,
  Layers
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/strategy-builder', label: 'Strategy Builder', icon: <Workflow size={20} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
    { path: '/agents', label: 'AI Agents', icon: <Bot size={20} /> },
    { path: '/protocols', label: 'Protocols', icon: <Database size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Layers className="text-indigo-400" size={28} />
          <span className="text-xl font-bold text-white">AptosDeFAI</span>
        </div>
        <div className="text-xs text-indigo-300 mt-1">Autonomous DeFi Management</div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-900/50 text-indigo-300'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="bg-indigo-900/30 p-3 rounded-lg">
          <div className="text-sm font-medium text-indigo-300">AptosDeFAI Beta</div>
          <div className="text-xs text-gray-400 mt-1">v0.1.0</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;