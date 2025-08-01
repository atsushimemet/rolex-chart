import { Model } from '@/types';
import Link from 'next/link';

interface ModelCardProps {
  model: Model;
}

export default function ModelCard({ model }: ModelCardProps) {
  return (
    <Link href={`/models/${model.id}`}>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div className="p-6">
          <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-gray-500 text-sm font-medium">
              {model.name.charAt(0)}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {model.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {model.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-blue-600 text-sm font-medium">
              {model.references.length} 型番
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
