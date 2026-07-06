import React, { useState, useEffect } from 'react';

export default function LoanForm({ onSubmit, loading, externalErrors }) {
    const [principal, setPrincipal] = useState('');
    const [annualRate, setAnnualRate] = useState('');
    const [tenureMonths, setTenureMonths] = useState('');
    
    const [errors, setErrors] = useState({});

    // Sync external backend errors when they change
    useEffect(() => {
        if (externalErrors) {
            setErrors(prev => ({
                ...prev,
                principal: externalErrors.principal?.[0] || '',
                annualRate: externalErrors.annual_rate?.[0] || '',
                tenureMonths: externalErrors.tenure_months?.[0] || ''
            }));
        }
    }, [externalErrors]);

    const validate = () => {
        const tempErrors = {};
        
        // Principal validation
        if (!principal) {
            tempErrors.principal = 'Loan amount is required.';
        } else if (isNaN(principal) || Number(principal) < 1000) {
            tempErrors.principal = 'Loan amount must be a number of at least 1,000.';
        }

        // Annual Rate validation
        if (!annualRate) {
            tempErrors.annualRate = 'Annual interest rate is required.';
        } else if (isNaN(annualRate) || Number(annualRate) < 0 || Number(annualRate) > 50) {
            tempErrors.annualRate = 'Annual interest rate must be between 0% and 50%.';
        }

        // Tenure validation
        if (!tenureMonths) {
            tempErrors.tenureMonths = 'Tenure is required.';
        } else if (isNaN(tenureMonths) || !Number.isInteger(Number(tenureMonths)) || Number(tenureMonths) < 1 || Number(tenureMonths) > 360) {
            tempErrors.tenureMonths = 'Tenure must be an integer between 1 and 360 months.';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validate()) {
            onSubmit({
                principal: parseFloat(principal),
                annual_rate: parseFloat(annualRate),
                tenure_months: parseInt(tenureMonths, 10)
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Principal / Loan Amount */}
            <div className="form-group">
                <label className="form-label" htmlFor="principal" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-blue)' }}>
                        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path d="M6 12h.01M18 12h.01"></path>
                    </svg>
                    <span>Loan Amount</span>
                </label>
                <div className="input-wrapper">
                    <span className="input-addon-left">₹</span>
                    <input 
                        type="number"
                        id="principal"
                        className={`form-input has-prefix ${errors.principal ? 'is-invalid' : ''}`}
                        placeholder="e.g. 500000"
                        value={principal}
                        onChange={(e) => {
                            setPrincipal(e.target.value);
                            setErrors(prev => ({ ...prev, principal: '' }));
                        }}
                        disabled={loading}
                    />
                </div>
                {errors.principal && <span className="error-text" id="principal-error">{errors.principal}</span>}
            </div>

            {/* Annual Interest Rate */}
            <div className="form-group">
                <label className="form-label" htmlFor="annualRate" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-blue)' }}>
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    <span>Annual Interest Rate</span>
                </label>
                <div className="input-wrapper">
                    <input 
                        type="number"
                        step="0.01"
                        id="annualRate"
                        className={`form-input has-suffix ${errors.annualRate ? 'is-invalid' : ''}`}
                        placeholder="e.g. 10.5"
                        value={annualRate}
                        onChange={(e) => {
                            setAnnualRate(e.target.value);
                            setErrors(prev => ({ ...prev, annualRate: '' }));
                        }}
                        disabled={loading}
                    />
                    <span className="input-addon-right">%</span>
                </div>
                {errors.annualRate && <span className="error-text" id="annualRate-error">{errors.annualRate}</span>}
            </div>

            {/* Tenure (months) */}
            <div className="form-group">
                <label className="form-label" htmlFor="tenureMonths" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-blue)' }}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>Tenure (Months)</span>
                </label>
                <div className="input-wrapper">
                    <input 
                        type="number"
                        id="tenureMonths"
                        className={`form-input ${errors.tenureMonths ? 'is-invalid' : ''}`}
                        placeholder="e.g. 24"
                        value={tenureMonths}
                        onChange={(e) => {
                            setTenureMonths(e.target.value);
                            setErrors(prev => ({ ...prev, tenureMonths: '' }));
                        }}
                        disabled={loading}
                    />
                </div>
                {errors.tenureMonths && <span className="error-text" id="tenureMonths-error">{errors.tenureMonths}</span>}
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
                id="calculate-button"
            >
                {loading ? (
                    <>
                        <div className="spinner"></div>
                        <span>Calculating...</span>
                    </>
                ) : (
                    <span>Calculate EMI</span>
                )}
            </button>
        </form>
    );
}
