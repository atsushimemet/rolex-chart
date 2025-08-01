'use client';

import { ChartData, TimeRange } from '@/types';
import { formatPrice } from '@/utils/data';
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceChartProps {
  data: ChartData;
  timeRange: TimeRange;
}

export default function PriceChart({ data, timeRange }: PriceChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            weight: 'bold' as const
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${formatPrice(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value: any) {
            return formatPrice(value);
          }
        }
      }
    }
  };

  const timeRangeLabels = {
    '1m': '1ヶ月',
    '3m': '3ヶ月',
    '6m': '6ヶ月',
    '1y': '1年'
  };

  return (
    <div className="w-full h-96 bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          価格推移 ({timeRangeLabels[timeRange]})
        </h3>
      </div>
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
} 
