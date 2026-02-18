import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StripePaymentForm } from '../components/payment/StripePaymentForm';
import { useUI } from '../contexts/UIContext';
import { useCommitments } from '../contexts/CommitmentContext';

export default function BondAuth() {
  const navigate = useNavigate();
  const { showToast } = useUI();
  const { currentCommitment } = useCommitments();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const stake = currentCommitment?.stake || 10;

  const handlePaymentSuccess = (paymentId: string) => {
    showToast('Payment authorized successfully!', 'success');
    console.log('Payment ID:', paymentId);
    navigate('/active-session');
  };

  const handlePaymentError = (error: string) => {
    showToast(error, 'error');
  };

  if (showPaymentForm) {
    return (
      <div className="min-h-screen bg-lockin-bg p-6">
        <h1 className="text-3xl font-bold text-lockin-primary mb-4">Authorize Payment</h1>
        <p className="text-lockin-secondary mb-8">
          Your payment method will be charged only if you fail to complete your commitment.
        </p>
        <StripePaymentForm
          amount={stake}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-lockin-bg p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-lockin-primary mb-4">Authorize Payment</h1>
        <p className="text-lockin-secondary mb-8">
          Your payment method will be charged only if you fail to complete your commitment.
        </p>

        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6 mb-6">
          <p className="text-lockin-secondary text-sm mb-2">Payment Hold</p>
          <p className="text-3xl font-bold text-lockin-primary">${stake.toFixed(2)}</p>
        </div>

        <button
          onClick={() => setShowPaymentForm(true)}
          className="w-full py-3 bg-lockin-accent text-white rounded-lg font-medium hover:opacity-90"
        >
          Add Payment Method
        </button>
      </div>
    </div>
  );
}

