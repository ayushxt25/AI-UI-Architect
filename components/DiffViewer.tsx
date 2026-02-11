"use client";

import React from 'react';

interface DiffViewerProps {
    oldPlan: any;
    newPlan: any;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ oldPlan, newPlan }) => {
    if (!oldPlan || !newPlan) return null;

    const getDeltas = () => {
        const deltas: string[] = [];
        if (newPlan.modifications) {
            newPlan.modifications.add?.forEach((a: any) => deltas.push(`+ Add ${a.component} to ${a.target}`));
            newPlan.modifications.update?.forEach((u: any) => deltas.push(`~ Update ${u.component} at ${u.target}`));
            newPlan.modifications.remove?.forEach((r: any) => deltas.push(`- Remove ${r.component} from ${r.target}`));
        }
        return deltas;
    };

    const deltas = getDeltas();

    return (
        <div style={{
            padding: '12px',
            background: 'rgba(5, 150, 105, 0.1)',
            border: '1px solid rgba(5, 150, 105, 0.2)',
            borderRadius: '8px',
            marginTop: '12px',
            fontSize: '12px'
        }}>
            <div style={{ fontWeight: 600, color: '#10b981', marginBottom: '8px' }}>
                Plan Diff (Hash: {newPlan.hash?.substring(0, 8)})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {deltas.map((d, i) => (
                    <div key={i} style={{
                        color: d.startsWith('+') ? '#34d399' : d.startsWith('-') ? '#f87171' : '#fbbf24',
                        fontFamily: 'monospace'
                    }}>
                        {d}
                    </div>
                ))}
                {deltas.length === 0 && <div style={{ color: '#94a3b8' }}>No structure changes detected (Prop update only)</div>}
            </div>
        </div>
    );
};
