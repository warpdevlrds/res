'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ProgressChartsProps {
  data: Array<{
    date: string;
    value: number;
    label?: string;
  }>;
  type?: 'line' | 'bar';
  title?: string;
  valueLabel?: string;
  color?: string;
}

export default function ProgressCharts({
  data,
  type = 'line',
  title,
  valueLabel = 'Valor',
  color = '#2563eb',
}: ProgressChartsProps) {
  const ChartComponent = type === 'line' ? LineChart : BarChart;
  const DataComponent = type === 'line' ? Line : Bar;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <DataComponent
            type={type === 'line' ? 'monotone' : undefined}
            dataKey="value"
            stroke={color}
            fill={color}
            strokeWidth={2}
            name={valueLabel}
          />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}
