import React, { memo } from 'react';

interface RadialProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  backgroundColor?: string;
  fillColor?: string;
  label?: string;
  showPercentage?: boolean;
}

export const RadialProgress = memo<RadialProgressProps>(function RadialProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  backgroundColor = 'var(--lockin-border)',
  fillColor = 'var(--lockin-accent)',
  label,
  showPercentage = true,
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={fillColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.5s ease',
          }}
        />
        {/* Center text */}
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="transform rotate-90"
          style={{
            transformOrigin: 'center',
            fontSize: size / 5,
            fontWeight: 'bold',
            fill: 'var(--lockin-primary)',
          }}
        >
          {showPercentage ? `${Math.round(percentage)}%` : value}
        </text>
      </svg>
      {label && (
        <p className="mt-2 text-sm text-lockin-secondary text-center">{label}</p>
      )}
    </div>
  );
});
