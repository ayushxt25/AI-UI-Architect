"use client";

import React from 'react';
import { Button } from './ui';

interface Version {
    id: number;
    timestamp: string;
    explanation: string;
}

interface VersionHistoryProps {
    versions: Version[];
    onRollback: (id: number) => void;
    currentVersionId?: number;
}

export const VersionHistory: React.FC<VersionHistoryProps> = ({ versions, onRollback, currentVersionId }) => {
    return (
        <div style={{
            padding: '20px',
            background: 'rgba(15, 23, 42, 0.5)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            maxHeight: '200px',
            overflowY: 'auto'
        }}>
            <h3 style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px' }}>
                Version History
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {versions.map((v) => (
                    <div key={v.id} style={{
                        padding: '10px',
                        borderRadius: '8px',
                        background: v.id === currentVersionId ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: v.id === currentVersionId ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.1)',
                        minWidth: '150px',
                        cursor: 'pointer'
                    }} onClick={() => onRollback(v.id)}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>Version {v.id}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>{new Date(v.timestamp).toLocaleTimeString()}</div>
                        <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {v.explanation}
                        </div>
                    </div>
                ))}
                {versions.length === 0 && <div style={{ fontSize: '12px', color: '#475569' }}>No versions yet...</div>}
            </div>
        </div>
    );
};
