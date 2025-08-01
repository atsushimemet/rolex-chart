import modelsData from '@/data/models.json';
import pricesData from '@/data/prices.json';
import { ChartData, Model, PriceData, TimeRange } from '@/types';

export const getModels = (): Model[] => {
  return modelsData as Model[];
};

export const getModelById = (id: string): Model | undefined => {
  return getModels().find(model => model.id === id);
};

export const getPriceData = (referenceId: string): PriceData | undefined => {
  return pricesData[referenceId as keyof typeof pricesData] as PriceData | undefined;
};

export const getChartData = (referenceId: string, timeRange: TimeRange): ChartData => {
  const priceData = getPriceData(referenceId);
  if (!priceData) {
    return {
      labels: [],
      datasets: []
    };
  }

  const dates = Object.keys(priceData.prices).sort();
  // 固定の基準日を使用してサーバーサイドとクライアントサイドで一貫性を保つ
  const baseDate = new Date('2024-07-30');
  let filteredDates: string[] = [];

  switch (timeRange) {
    case '1m':
      const oneMonthAgo = new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, baseDate.getDate());
      filteredDates = dates.filter(date => new Date(date) >= oneMonthAgo);
      break;
    case '3m':
      const threeMonthsAgo = new Date(baseDate.getFullYear(), baseDate.getMonth() - 3, baseDate.getDate());
      filteredDates = dates.filter(date => new Date(date) >= threeMonthsAgo);
      break;
    case '6m':
      const sixMonthsAgo = new Date(baseDate.getFullYear(), baseDate.getMonth() - 6, baseDate.getDate());
      filteredDates = dates.filter(date => new Date(date) >= sixMonthsAgo);
      break;
    case '1y':
      const oneYearAgo = new Date(baseDate.getFullYear() - 1, baseDate.getMonth(), baseDate.getDate());
      filteredDates = dates.filter(date => new Date(date) >= oneYearAgo);
      break;
  }

  const prices = filteredDates.map(date => priceData.prices[date]);
  const formattedDates = filteredDates.map(date => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  });

  return {
    labels: formattedDates,
    datasets: [
      {
        label: `${priceData.model} ${priceData.reference}`,
        data: prices,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  };
};

export const formatPrice = (price: number): string => {
  // サーバーサイドとクライアントサイドで一貫した結果を返す
  try {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(price);
  } catch (error) {
    // フォールバック: シンプルな形式
    return `¥${price.toLocaleString()}`;
  }
}; 
