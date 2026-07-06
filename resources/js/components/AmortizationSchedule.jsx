import React from 'react';

export default function AmortizationSchedule({ schedule, onShowRowJson }) {
    // Utility to format values as currency
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(val);
    };
    // Helper to get month name and year starting from the current date
    const getMonthName = (monthOffset) => {
        const date = new Date();
        date.setMonth(date.getMonth() + monthOffset - 1);
        return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="schedule-section">
            <h3 className="panel-title" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-blue)' }}>
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                Amortization Schedule
            </h3>
            <div className="table-wrapper">
                <table className="schedule-table" id="schedule-table">
                    <thead>
                        <tr>
                            <th>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    Month
                                </span>
                            </th>
                            <th>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                    Principal Paid
                                </span>
                            </th>
                            <th>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                                    Interest Paid
                                </span>
                            </th>
                            <th>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="12" y1="10" x2="12" y2="14"></line><line x1="10" y1="12" x2="14" y2="12"></line></svg>
                                    Remaining Balance
                                </span>
                            </th>
                            <th>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                    Details
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((row) => (
                            <tr key={row.month} id={`schedule-row-${row.month}`}>
                                <td className="month-col">{getMonthName(row.month)}</td>
                                <td className="money-col">{formatCurrency(row.principal_paid)}</td>
                                <td className="money-col text-teal">{formatCurrency(row.interest_paid)}</td>
                                <td className="money-col">{formatCurrency(row.balance)}</td>
                                <td>
                                    <button 
                                        className="info-icon-btn"
                                        onClick={() => onShowRowJson(row)}
                                        title="View Month JSON Data"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="16" x2="12" y2="12"></line>
                                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
