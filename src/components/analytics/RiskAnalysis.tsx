import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RiskAnalysis = () => {
  const data = {
    labels: ['Volatility', 'Impermanent Loss', 'Smart Contract', 'Market', 'Liquidity', 'Counterparty'],
    datasets: [
      {
        label: 'Current Portfolio',
        data: [3, 4, 2, 5, 3, 2],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: '#6366f1',
        borderWidth: 2,
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#6366f1',
      },
      {
        label: 'Benchmark',
        data: [5, 3, 4, 4, 4, 3],
        backgroundColor: 'rgba(156, 163, 175, 0.2)',
        borderColor: 'rgba(156, 163, 175, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(156, 163, 175, 0.8)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(156, 163, 175, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        pointLabels: {
          color: '#9ca3af',
          font: {
            size: 11,
          },
        },
        ticks: {
          backdropColor: 'transparent',
          color: '#6b7280',
          z: 100,
        },
        min: 0,
        max: 10,
      },
    },
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
  };

  return (
    <div className="h-80">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RiskAnalysis;