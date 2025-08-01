import ModelCard from '@/components/ModelCard';
import { getModels } from '@/utils/data';

export default function HomePage() {
  const models = getModels();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Rolex Chart
              </h1>
              <p className="text-gray-600 mt-1">
                楽天市場 Rolex価格推移ビジュアライザ
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Rolexを探す
          </h2>
          <p className="text-gray-600">
            価格推移を確認したいモデルを選択してください
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {models.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>
            本サービスは楽天市場の価格データを基にしたプロトタイプです。
            <br />
            実際の価格とは異なる場合があります。
          </p>
        </div>
      </main>
    </div>
  );
}
