import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ label, variant = 'primary', style, ...props }) => {
    const baseStyle: React.CSSProperties = {
        padding: '8px 16px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '14px',
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
    };

    const variantStyles: Record<string, React.CSSProperties> = {
        primary: {
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            color: 'white',
            boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)',
        },
        secondary: {
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#e2e8f0',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
        },
    };

    return (
        <button
            style={{ ...baseStyle, ...variantStyles[variant], ...style }}
            {...props}
        >
            {label}
        </button>
    );
};
