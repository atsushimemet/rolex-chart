import ReferenceCard from '@/components/ReferenceCard';
import { getModelById } from '@/utils/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ModelPageProps {
  params: Promise<{
    modelId: string;
  }>;
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { modelId } = await params;
  const model = getModelById(modelId);

  if (!model) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link href="/" className="text-blue-600 hover:text-blue-800 mb-2 inline-block">
                ← ホームに戻る
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                {model.name}
              </h1>
              <p className="text-gray-600 mt-1">
                {model.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            型番を選択
          </h2>
          <p className="text-gray-600">
            価格推移を確認したい型番を選択してください
          </p>
        </div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {model.references.map((reference) => (
            <ReferenceCard
              key={reference.id}
              reference={reference}
              modelId={model.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
} 
