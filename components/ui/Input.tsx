import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input: React.FC<InputProps> = ({ style, ...props }) => {
    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '10px 14px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        color: 'white',
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.2s ease',
        boxSizing: 'border-box',
        ...style
    };

    return (
        <input
            style={inputStyle}
            {...props}
            onFocus={(e) => {
                e.currentTarget.style.border = '1px solid #6366f1';
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
            }}
            onBlur={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        />
    );
};
