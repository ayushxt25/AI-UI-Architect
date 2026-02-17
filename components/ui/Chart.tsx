import React from 'react';

interface ChartProps {
    type: 'line' | 'bar' | 'pie';
    data: any;
    style?: React.CSSProperties;
}

export const Chart: React.FC<ChartProps> = ({ type, data, style }) => {
    return (
        <div style={{
            padding: '24px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            height: '240px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            ...style
        }}>
            <div style={{ color: '#6366f1', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' }}>
                {type} Chart Placeholder
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                Data Context: {data ? JSON.stringify(data).substring(0, 50) : 'No data provided'}...
            </div>
            <div style={{
                marginTop: '20px',
                display: 'flex',
                gap: '4px',
                alignItems: 'flex-end',
                height: '60px'
            }}>
                {[40, 70, 45, 90, 65, 80].map((h, i) => (
                    <div key={i} style={{
                        width: '12px',
                        height: `${h}%`,
                        background: 'linear-gradient(to top, #6366f1, #a855f7)',
                        borderRadius: '2px'
                    }} />
                ))}
            </div>
        </div>
    );
};
