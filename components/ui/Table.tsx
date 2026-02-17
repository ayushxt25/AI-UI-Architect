import React from 'react';

interface TableProps {
    headers: string[];
    rows: (string | number | React.ReactNode)[][];
    style?: React.CSSProperties;
}

export const Table: React.FC<TableProps> = ({ headers, rows, style }) => {
    const tableWrapperStyle: React.CSSProperties = {
        width: '100%',
        overflowX: 'auto',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        ...style
    };

    const tableStyle: React.CSSProperties = {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px',
        textAlign: 'left',
    };

    const thStyle: React.CSSProperties = {
        padding: '12px 16px',
        background: 'rgba(255, 255, 255, 0.05)',
        color: '#94a3b8',
        fontWeight: 600,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    };

    const tdStyle: React.CSSProperties = {
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        color: '#e2e8f0',
    };

    return (
        <div style={tableWrapperStyle}>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i} style={thStyle}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {(rows || []).map((row, i) => (
                        <tr key={i} style={{ transition: 'background 0.2s ease' }}>
                            {(row || []).map((cell, j) => (
                                <td key={j} style={tdStyle}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
