import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StrategyComparison = () => {
  const data = {
    labels: ['Yield Optimizer', 'Stablecoin Yield', 'LP Optimizer', 'Delta Neutral'],
    datasets: [
      {
        label: 'Returns',
        data: [12.8, 8.5, 15.2, 9.7],
        backgroundColor: '#6366f1',
      },
      {
        label: 'Risk Score',
        data: [6.5, 3.2, 8.7, 5.4],
        backgroundColor: '#f43f5e',
      },
      {
        label: 'Efficiency',
        data: [8.2, 9.5, 7.1, 8.3],
        backgroundColor: '#10b981',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#9ca3af',
          boxWidth: 12,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        },
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: '#6b7280',
        },
        min: 0,
        max: 20,
      },
    },
  };

  return (
    <div className="h-80">
      <Bar data={data} options={options} />
    </div>
  );
};

export default StrategyComparison;