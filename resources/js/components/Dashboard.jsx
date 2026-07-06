import React, { useState } from 'react';
import LoanForm from './LoanForm';
import ResultsDisplay from './ResultsDisplay';
import AmortizationSchedule from './AmortizationSchedule';
import axios from 'axios';

export default function Dashboard() {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [showJsonModal, setShowJsonModal] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

    const handleCalculate = async (formData) => {
        setLoading(true);
        setError(null);
        setValidationErrors({});
        setResults(null);

        try {
            // Introduce a small delay to make the loading animation smooth and visible
            await new Promise(resolve => setTimeout(resolve, 800));
            const response = await axios.post('/api/loan/calculate', formData);
            setResults(response.data);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 422) {
                // Laravel validation errors
                setValidationErrors(err.response.data.errors || {});
                setError("Please correct the validation errors in the form.");
            } else {
                setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <header className="app-header">
                <div className="header-container">
                    <h1 className="logo-text">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-blue)' }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="9" y1="9" x2="15" y2="9"></line>
                            <line x1="9" y1="13" x2="15" y2="13"></line>
                            <line x1="9" y1="17" x2="15" y2="17"></line>
                        </svg>
                        <span>Loan <span className="accent-brand-text">EMI</span> Calculator</span>
                    </h1>
                </div>
            </header>

            <main className="dashboard-layout">
                <div className="grid-container">
                    {/* Left Column: Form */}
                    <div className="panel-card">
                        <h2 className="panel-title">Calculator Inputs</h2>
                        {error && (
                            <div className="alert-error" id="error-alert">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                    <line x1="12" y1="9" x2="12" y2="13"></line>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                                <div>{error}</div>
                            </div>
                        )}
                        <LoanForm
                             onSubmit={handleCalculate}
                             loading={loading}
                             externalErrors={validationErrors}
                        />
                    </div>

                    {/* Right Column: Output Results */}
                    <div className="panel-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 className="panel-title">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-blue)' }}>
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="9" y1="9" x2="15" y2="9"></line>
                                    <line x1="9" y1="13" x2="15" y2="13"></line>
                                    <line x1="9" y1="17" x2="15" y2="17"></line>
                                </svg>
                                Calculation Summary
                            </h2>
                            {results && (
                                <button
                                    className="info-icon-btn"
                                    onClick={() => setShowJsonModal(true)}
                                    title="View Raw JSON Response"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                    </svg>
                                </button>
                            )}
                        </div>
                        {loading ? (
                            <div className="empty-results-state">
                                <div className="spinner"></div>
                                <p style={{ marginTop: '1rem' }}>Calculating EMI details...</p>
                            </div>
                        ) : results ? (
                            <div className="results-container">
                                <ResultsDisplay
                                    emi={results.emi}
                                    totalInterest={results.total_interest}
                                    totalPayment={results.total_payment}
                                />
                                <AmortizationSchedule schedule={results.schedule} onShowRowJson={setSelectedRowData} />
                            </div>
                        ) : (
                            <div className="empty-results-state">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                    <line x1="18" y1="20" x2="18" y2="10"></line>
                                    <line x1="12" y1="20" x2="12" y2="4"></line>
                                    <line x1="6" y1="20" x2="6" y2="14"></line>
                                </svg>
                                <p>Enter the loan parameters and click Calculate to view your amortization schedule.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="app-footer">
                <div className="footer-content">
                    <p>&copy; {new Date().getFullYear()} Loan EMI Calculator. All rights reserved.</p>
                </div>
            </footer>

            {showJsonModal && (
                <div className="modal-backdrop" onClick={() => setShowJsonModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-teal)' }}>
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                                <span>Raw JSON Response Body</span>
                            </h3>
                            <button className="modal-close-btn" onClick={() => setShowJsonModal(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <pre className="json-code-block">
                                <code>{JSON.stringify(results, null, 2)}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            )}

            {selectedRowData && (
                <div className="modal-backdrop" onClick={() => setSelectedRowData(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-teal)' }}>
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                                <span>Month {selectedRowData.month} Raw JSON</span>
                            </h3>
                            <button className="modal-close-btn" onClick={() => setSelectedRowData(null)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <pre className="json-code-block">
                                <code>{JSON.stringify(selectedRowData, null, 2)}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
