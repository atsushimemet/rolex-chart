import DynamicPriceChart from '@/components/DynamicPriceChart';
import { formatPrice, getModelById, getPriceData as getPriceDataUtil } from '@/utils/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ReferencePageProps {
  params: Promise<{
    modelId: string;
    referenceId: string;
  }>;
}

export default async function ReferencePage({ params }: ReferencePageProps) {
  const { modelId, referenceId } = await params;
  
  // サーバーサイドでデータを取得
  const model = getModelById(modelId);
  const priceData = getPriceDataUtil(referenceId);

  if (!model || !priceData) {
    notFound();
  }

  const reference = model.references.find((ref: any) => ref.id === referenceId);
  if (!reference) {
    notFound();
  }

  // 初期データを準備
  const dates = Object.keys(priceData.prices).sort();
  const latestDate = dates[dates.length - 1];
  const latestPrice = priceData.prices[latestDate];
  const formattedPrice = formatPrice(latestPrice);

  return (
    <div className="min-h-screen bg-gray-50">
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
              <p className="text-3xl font-bold text-blue-600">
                {formattedPrice}
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
          <DynamicPriceChart referenceId={referenceId} />
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
