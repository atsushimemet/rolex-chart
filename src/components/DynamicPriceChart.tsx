'use client';

import { TimeRange } from '@/types';
import { getChartData } from '@/utils/data';
import { useEffect, useState } from 'react';
import PriceChart from './PriceChart';
import TimeRangeSelector from './TimeRangeSelector';

interface DynamicPriceChartProps {
  referenceId: string;
}

export default function DynamicPriceChart({ referenceId }: DynamicPriceChartProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1m');
  const [chartData, setChartData] = useState(() => getChartData(referenceId, '1m'));

  useEffect(() => {
    setChartData(getChartData(referenceId, selectedRange));
  }, [referenceId, selectedRange]);

  return (
    <div>
      <TimeRangeSelector
        initialRange={selectedRange}
        onRangeChange={setSelectedRange}
      />
      <PriceChart data={chartData} timeRange={selectedRange} />
    </div>
  );
} 
