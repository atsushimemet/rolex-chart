export interface Reference {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  image: string;
  references: Reference[];
}

export interface PriceData {
  model: string;
  reference: string;
  prices: Record<string, number>;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}

export type TimeRange = '1m' | '3m' | '6m' | '1y'; 
