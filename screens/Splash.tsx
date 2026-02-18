import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-lockin-bg">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-lockin-primary">LOCKIN</h1>
        <p className="mt-4 text-lockin-secondary">Commitment Management Platform</p>
      </div>
    </div>
  );
}
