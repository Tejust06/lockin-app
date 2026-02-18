import React from 'react';

export default function Wallet() {
  return (
    <div className="min-h-screen bg-lockin-bg p-6 pt-safe-top pb-safe-bottom">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-lockin-primary mb-2">Wallet</h1>
        <p className="text-lockin-secondary">Manage your payment methods</p>
      </div>

      <div className="space-y-6">
        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-lockin-primary mb-4">Balance</h2>
          <p className="text-4xl font-bold text-lockin-primary">$0.00</p>
        </div>

        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-lockin-primary mb-4">Payment Methods</h2>
          <button className="w-full py-3 bg-lockin-subtle border border-lockin-border rounded-lg text-lockin-primary font-medium hover:bg-lockin-surface">
            Add Payment Method
          </button>
        </div>

        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-lockin-primary mb-4">Recent Transactions</h2>
          <p className="text-lockin-secondary text-center py-8">No transactions yet</p>
        </div>
      </div>
    </div>
  );
}
