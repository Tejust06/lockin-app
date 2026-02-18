import React, { memo } from 'react';

interface StreakChartProps {
  data: number[];
  labels?: string[];
  height?: number;
  barColor?: string;
  maxValue?: number;
}

export const StreakChart = memo<StreakChartProps>(function StreakChart({
  data,
  labels,
  height = 100,
  barColor = 'var(--lockin-accent)',
  maxValue,
}) {
  const max = maxValue || Math.max(...data, 1);
  const barWidth = 100 / data.length;
  const gap = 2; // Gap between bars in percentage points

  return (
    <div className="w-full">
      <svg width="100%" height={height} className="rounded-lg">
        {data.map((value, index) => {
          const barHeight = (value / max) * height;
          const x = index * barWidth + gap / 2;
          const y = height - barHeight;
          const width = barWidth - gap;

          return (
            <g key={index}>
              <rect
                x={`${x}%`}
                y={y}
                width={`${width}%`}
                height={barHeight}
                fill={barColor}
                rx={2}
                className="transition-all duration-300"
              />
              {labels && labels[index] && (
                <text
                  x={`${index * barWidth + barWidth / 2}%`}
                  y={height - 2}
                  textAnchor="middle"
                  style={{
                    fontSize: 10,
                    fill: 'var(--lockin-secondary)',
                  }}
                >
                  {labels[index]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
});
