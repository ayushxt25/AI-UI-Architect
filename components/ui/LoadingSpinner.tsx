"use client";

import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            width: '100%'
        }}>
            <div style={{
                width: '32px',
                height: '32px',
                border: '3px solid rgba(99, 102, 241, 0.1)',
                borderTop: '3px solid #6366f1',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
            }} />
            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};
