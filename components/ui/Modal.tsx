import React from 'react';

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const overlayStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    };

    const modalStyle: React.CSSProperties = {
        background: '#1e293b',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: '90%',
        maxWidth: '500px',
        padding: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        color: 'white',
    };

    const headerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    };

    const closeButtonStyle: React.CSSProperties = {
        background: 'none',
        border: 'none',
        color: '#94a3b8',
        cursor: 'pointer',
        fontSize: '24px',
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={headerStyle}>
                    <h2 style={{ margin: 0, fontSize: '20px' }}>{title}</h2>
                    <button style={closeButtonStyle} onClick={onClose}>&times;</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};
