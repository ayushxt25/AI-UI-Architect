import React from 'react';

interface NavbarProps {
    title: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export const Navbar: React.FC<NavbarProps> = ({ title, children, style }) => {
    const navStyle: React.CSSProperties = {
        height: '64px',
        width: '100%',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxSizing: 'border-box',
        ...style
    };

    return (
        <nav style={navStyle}>
            <h1 style={{ fontSize: '18px', fontWeight: 700, color: 'white', margin: 0 }}>{title}</h1>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {children}
            </div>
        </nav>
    );
};
