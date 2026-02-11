"use client";

import React from 'react';

interface GridProps {
    columns?: number;
    gap?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const Grid: React.FC<GridProps> = ({ columns = 3, gap = '20px', children, style }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: gap,
            width: '100%',
            ...style
        }}>
            {children}
        </div>
    );
};
