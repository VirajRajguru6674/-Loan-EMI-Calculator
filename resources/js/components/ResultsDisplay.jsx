import React from 'react';

export default function ResultsDisplay({ emi, totalInterest, totalPayment }) {
    // Utility to format values as currency
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(val);
    };

    return (
        <div className="results-header-grid">
            {/* Highlighted Card for EMI */}
            <div className="summary-card highlight" id="emi-card">
                <div className="summary-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="summary-icon">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    Monthly EMI
                </div>
                <div className="summary-value" id="emi-value">{formatCurrency(emi)}</div>
            </div>

            {/* Total Interest Card */}
            <div className="summary-card" id="interest-card">
                <div className="summary-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="summary-icon">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    Total Interest
                </div>
                <div className="summary-value" id="interest-value">{formatCurrency(totalInterest)}</div>
            </div>

            {/* Total Payment Card */}
            <div className="summary-card" id="payment-card">
                <div className="summary-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="summary-icon">
                        <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                        <line x1="12" y1="10" x2="12" y2="14"></line>
                        <line x1="10" y1="12" x2="14" y2="12"></line>
                    </svg>
                    Total Payment
                </div>
                <div className="summary-value" id="payment-value">{formatCurrency(totalPayment)}</div>
            </div>
        </div>
    );
}
