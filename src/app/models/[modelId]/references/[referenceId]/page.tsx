'use client';

import PriceChart from '@/components/PriceChart';
import TimeRangeSelector from '@/components/TimeRangeSelector';
import { TimeRange } from '@/types';
import { formatPrice, getChartData, getModelById, getPriceData as getPriceDataUtil } from '@/utils/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';

interface ReferencePageProps {
  params: Promise<{
    modelId: string;
    referenceId: string;
  }>;
}

export default function ReferencePage({ params }: ReferencePageProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1m');
  const [isClient, setIsClient] = useState(false);
  const [model, setModel] = useState<any>(null);
  const [priceData, setPriceData] = useState<any>(null);
  const [reference, setReference] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [latestPrice, setLatestPrice] = useState<number>(0);
  const [latestDate, setLatestDate] = useState<string>('');
  const [formattedPrice, setFormattedPrice] = useState<string>('');
  
  // React.use()を使用してparamsを取得
  const { modelId, referenceId } = use(params);
  
  useEffect(() => {
    setIsClient(true);
    
    const loadData = async () => {
      const modelData = getModelById(modelId);
      const priceDataUtil = getPriceDataUtil(referenceId);

      if (!modelData || !priceDataUtil) {
        notFound();
      }

      const referenceData = modelData.references.find((ref: any) => ref.id === referenceId);
      if (!referenceData) {
        notFound();
      }

      const chartDataUtil = getChartData(referenceId, selectedRange);
      const dates = Object.keys(priceDataUtil.prices).sort();
      const latestDateUtil = dates[dates.length - 1];
      const latestPriceUtil = priceDataUtil.prices[latestDateUtil];

      setModel(modelData);
      setPriceData(priceDataUtil);
      setReference(referenceData);
      setChartData(chartDataUtil);
      setLatestPrice(latestPriceUtil);
      setLatestDate(latestDateUtil);
      setFormattedPrice(formatPrice(latestPriceUtil));
    };

    loadData();
  }, [modelId, referenceId, selectedRange]);

  if (!model || !priceData || !reference) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link href={`/models/${model.id}`} className="text-blue-600 hover:text-blue-800 mb-2 inline-block">
                ← {model.name}に戻る
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                {model.name} {reference.name}
              </h1>
              <p className="text-gray-600 mt-1">
                {reference.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Price */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                現在価格
              </h2>
              <p className="text-3xl font-bold text-blue-600" suppressHydrationWarning>
                {isClient ? formattedPrice : `¥${latestPrice.toLocaleString()}`}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                最終更新: {latestDate}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">楽天市場参考価格</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-8">
          <TimeRangeSelector
            selectedRange={selectedRange}
            onRangeChange={setSelectedRange}
          />
          {isClient && chartData && <PriceChart data={chartData} timeRange={selectedRange} />}
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                注意事項
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  本サービスは楽天市場の価格データを基にしたプロトタイプです。
                  実際の価格とは異なる場合があります。
                  購入・売却の判断は自己責任で行ってください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
