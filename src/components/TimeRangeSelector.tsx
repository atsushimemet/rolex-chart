'use client';

import { TimeRange } from '@/types';
import { useState } from 'react';

interface TimeRangeSelectorProps {
  initialRange?: TimeRange;
  onRangeChange?: (range: TimeRange) => void;
}

export default function TimeRangeSelector({ 
  initialRange = '1m', 
  onRangeChange 
}: TimeRangeSelectorProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>(initialRange);

  const ranges: { value: TimeRange; label: string }[] = [
    { value: '1m', label: '1ヶ月' },
    { value: '3m', label: '3ヶ月' },
    { value: '6m', label: '6ヶ月' },
    { value: '1y', label: '1年' },
  ];

  const handleRangeChange = (range: TimeRange) => {
    setSelectedRange(range);
    onRangeChange?.(range);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">期間選択</h3>
      <div className="flex space-x-2">
        {ranges.map((range) => (
          <button
            key={range.value}
            onClick={() => handleRangeChange(range.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedRange === range.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
} 
