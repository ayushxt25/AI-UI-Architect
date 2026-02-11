import React from 'react';

interface SidebarProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const Sidebar: React.FC<SidebarProps> = ({ children, style }) => {
    const sidebarStyle: React.CSSProperties = {
        width: '240px',
        height: '100%',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        gap: '8px',
        boxSizing: 'border-box',
        ...style
    };

    return <aside style={sidebarStyle}>{children}</aside>;
};
