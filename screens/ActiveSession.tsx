import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ActiveSession() {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate('/home');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lockin-bg p-6">
      <h1 className="text-2xl font-bold text-lockin-primary mb-8">Session Active</h1>
      
      <div className="text-center mb-12">
        <p className="text-6xl font-mono font-bold text-lockin-primary mb-4">
          {formatTime(timeRemaining)}
        </p>
        <p className="text-lockin-secondary">Keep going! Stay focused on your goal.</p>
      </div>

      <button
        onClick={() => navigate('/penalty')}
        className="px-8 py-3 bg-lockin-danger text-white rounded-lg font-medium hover:opacity-90"
      >
        End Early (Penalty)
      </button>
    </div>
  );
}
