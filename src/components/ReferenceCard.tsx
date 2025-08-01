import { Reference } from '@/types';
import Link from 'next/link';

interface ReferenceCardProps {
  reference: Reference;
  modelId: string;
}

export default function ReferenceCard({ reference, modelId }: ReferenceCardProps) {
  return (
    <Link href={`/models/${modelId}/references/${reference.id}`} className="h-full">
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        <div className="p-8 flex-1 flex flex-col">
          <div className="w-20 h-20 bg-blue-100 rounded-lg mb-6 flex items-center justify-center">
            <span className="text-blue-600 text-lg font-medium">
              {reference.name}
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            {reference.name}
          </h3>
          <p className="text-gray-600 text-base mb-6 leading-relaxed">
            {reference.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-blue-600 text-base font-medium">
              価格推移を見る
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
