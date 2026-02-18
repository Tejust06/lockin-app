import React, { memo } from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  label?: string;
}

export const ProgressBar = memo<ProgressBarProps>(function ProgressBar({
  value,
  max = 100,
  height = 8,
  backgroundColor = 'var(--lockin-subtle)',
  fillColor = 'var(--lockin-accent)',
  label,
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-sm text-lockin-secondary mb-2">
          <span>{label}</span>
          <span>{value} / {max}</span>
        </div>
      )}
      <svg width="100%" height={height} className="rounded-full">
        <rect
          x="0"
          y="0"
          width="100%"
          height={height}
          fill={backgroundColor}
          rx={height / 2}
        />
        <rect
          x="0"
          y="0"
          width={`${percentage}%`}
          height={height}
          fill={fillColor}
          rx={height / 2}
        />
      </svg>
    </div>
  );
});
