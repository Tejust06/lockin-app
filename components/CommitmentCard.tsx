import React, { memo, useCallback } from 'react';
import { Commitment } from '../types';
import { Clock, DollarSign, Target } from 'lucide-react';

interface CommitmentCardProps {
  commitment: Commitment;
  onSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const CommitmentCard = memo<CommitmentCardProps>(function CommitmentCard({
  commitment,
  onSelect,
  onDelete,
}) {
  const handleSelect = useCallback(() => {
    onSelect?.(commitment.id);
  }, [commitment.id, onSelect]);

  const handleDelete = useCallback(() => {
    onDelete?.(commitment.id);
  }, [commitment.id, onDelete]);

  const getStateColor = (state: string): string => {
    switch (state) {
      case 'active':
        return 'text-lockin-success';
      case 'completed':
        return 'text-lockin-success';
      case 'failed':
        return 'text-lockin-danger';
      case 'paused':
        return 'text-yellow-500';
      default:
        return 'text-lockin-secondary';
    }
  };

  return (
    <div
      className="bg-lockin-surface border border-lockin-border rounded-xl p-4 hover:bg-lockin-subtle transition-colors cursor-pointer"
      onClick={handleSelect}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Target size={16} className="text-lockin-accent" />
            <h3 className="font-semibold text-lockin-primary">{commitment.goal}</h3>
          </div>
          <span className={`text-xs font-medium uppercase ${getStateColor(commitment.state)}`}>
            {commitment.state}
          </span>
        </div>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="text-lockin-danger hover:opacity-80"
            aria-label="Delete commitment"
          >
            ×
          </button>
        )}
      </div>

      <div className="flex items-center space-x-4 text-sm text-lockin-secondary">
        <div className="flex items-center space-x-1">
          <Clock size={14} />
          <span>{commitment.duration} min</span>
        </div>
        <div className="flex items-center space-x-1">
          <DollarSign size={14} />
          <span>${commitment.stake}</span>
        </div>
      </div>

      {commitment.startedAt && (
        <div className="mt-3 pt-3 border-t border-lockin-border text-xs text-lockin-secondary">
          Started: {new Date(commitment.startedAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
});
