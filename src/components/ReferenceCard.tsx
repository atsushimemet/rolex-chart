import { Reference } from '@/types';
import Link from 'next/link';

interface ReferenceCardProps {
  reference: Reference;
  modelId: string;
}

export default function ReferenceCard({ reference, modelId }: ReferenceCardProps) {
  return (
    <Link href={`/models/${modelId}/references/${reference.id}`}>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div className="p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-blue-600 text-sm font-medium">
              {reference.name}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {reference.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {reference.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-blue-600 text-sm font-medium">
              価格推移を見る
            </span>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
} 
