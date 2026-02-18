import React, { useState } from 'react';

/**
 * Stripe Payment Form Component
 * This is a placeholder that would integrate with real Stripe Elements
 * To fully implement:
 * 1. Install @stripe/react-stripe-js and @stripe/stripe-js
 * 2. Wrap this in <Elements> provider with loadStripe()
 * 3. Use <CardElement> or <PaymentElement> from Stripe
 */

interface StripePaymentFormProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
}

export function StripePaymentForm({ amount, onSuccess, onError }: StripePaymentFormProps): JSX.Element {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Mock payment processing
      // In production, this would use Stripe's confirmPayment() method
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate successful payment
      const mockPaymentId = `pi_${crypto.randomUUID()}`;
      onSuccess(mockPaymentId);
    } catch (error) {
      onError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
        <p className="text-lockin-secondary text-sm mb-2">Payment Amount</p>
        <p className="text-3xl font-bold text-lockin-primary">${amount.toFixed(2)}</p>
      </div>

      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-lockin-primary mb-2">
          Card Number
        </label>
        <input
          id="cardNumber"
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          className="w-full px-4 py-3 bg-lockin-surface border border-lockin-border rounded-lg text-lockin-primary"
          required
          disabled={isProcessing}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-lockin-primary mb-2">
            Expiry Date
          </label>
          <input
            id="expiryDate"
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            className="w-full px-4 py-3 bg-lockin-surface border border-lockin-border rounded-lg text-lockin-primary"
            required
            disabled={isProcessing}
          />
        </div>
        <div>
          <label htmlFor="cvc" className="block text-sm font-medium text-lockin-primary mb-2">
            CVC
          </label>
          <input
            id="cvc"
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="123"
            className="w-full px-4 py-3 bg-lockin-surface border border-lockin-border rounded-lg text-lockin-primary"
            required
            disabled={isProcessing}
          />
        </div>
      </div>

      <p className="text-xs text-lockin-secondary">
        This is a mock payment form. In production, this would use Stripe Elements for PCI compliance.
        Your payment method will be charged only if you fail to complete your commitment.
      </p>

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full py-3 bg-lockin-accent text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : `Authorize $${amount.toFixed(2)}`}
      </button>
    </form>
  );
}
