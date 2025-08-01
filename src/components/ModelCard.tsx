import { Model } from '@/types';
import Link from 'next/link';

interface ModelCardProps {
  model: Model;
}

export default function ModelCard({ model }: ModelCardProps) {
  return (
    <Link href={`/models/${model.id}`} className="h-full">
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        <div className="p-8 flex-1 flex flex-col">
          <div className="w-20 h-20 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
            <span className="text-gray-500 text-lg font-medium">
              {model.name.charAt(0)}
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            {model.name}
          </h3>
          <p className="text-gray-600 text-base mb-6 leading-relaxed">
            {model.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-blue-600 text-base font-medium">
              {model.references.length} 型番
            </span>
            <svg
              className="w-6 h-6 text-gray-400"
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
