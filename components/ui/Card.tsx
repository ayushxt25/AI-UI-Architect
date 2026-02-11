import React from 'react';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ title, children, style }) => {
    const cardStyle: React.CSSProperties = {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '20px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        ...style
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '18px',
        fontWeight: 700,
        margin: 0,
        color: '#fff',
        borderBottom: title ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        paddingBottom: title ? '12px' : 0,
    };

    return (
        <div style={cardStyle}>
            {title && <h3 style={titleStyle}>{title}</h3>}
            <div style={{ flex: 1 }}>{children}</div>
        </div>
    );
};
