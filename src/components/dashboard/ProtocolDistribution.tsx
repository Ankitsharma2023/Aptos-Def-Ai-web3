import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProtocolDistribution = () => {
  const data = {
    labels: ['Liquidswap', 'Ditto Finance', 'Aries Markets', 'Thala', 'Pancake Swap', 'Econia'],
    datasets: [
      {
        data: [35, 20, 15, 12, 10, 8],
        backgroundColor: [
          '#6366f1', // indigo
          '#8b5cf6', // purple
          '#ec4899', // pink
          '#f43f5e', // rose
          '#10b981', // emerald
          '#3b82f6', // blue
        ],
        borderColor: 'rgba(17, 24, 39, 0.8)',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#9ca3af',
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      },
    },
    cutout: '70%',
  };

  return (
    <div>
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
            <span className="text-gray-300">Liquidswap</span>
          </div>
          <span className="text-white font-medium">$43,598.50</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-gray-300">Ditto Finance</span>
          </div>
          <span className="text-white font-medium">$24,913.70</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
            <span className="text-gray-300">Aries Markets</span>
          </div>
          <span className="text-white font-medium">$18,685.27</span>
        </div>
      </div>
    </div>
  );
};

export default ProtocolDistribution;