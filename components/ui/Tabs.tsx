"use client";

import React, { useState } from 'react';

interface TabsProps {
    tabs: { label: string; id: string }[];
    children: (activeTabId: string) => React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, children }) => {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id);

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '8px' }}>
                {(tabs || []).map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '8px 16px',
                            fontSize: '14px',
                            fontWeight: 600,
                            background: activeTab === tab.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                            color: activeTab === tab.id ? '#6366f1' : '#94a3b8',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div style={{ flex: 1 }}>
                {children(activeTab)}
            </div>
        </div>
    );
};
