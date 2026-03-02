"use client";

import React from 'react';
import { useAppState } from '@/lib/state/appState';

export const ThemeSettings: React.FC = () => {
    const { state, setThemeConfig } = useAppState();
    const { themeConfig } = state;

    return (
        <div style={{
            padding: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            background: '#0f172a',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        }}>
            <h3 style={{ margin: 0, fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '8px' }}>Theme Settings</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '14px' }}>Mode</label>
                <select
                    value={themeConfig.theme}
                    onChange={(e) => setThemeConfig({ theme: e.target.value as 'light' | 'dark' })}
                    style={{ background: '#1e293b', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '4px 8px' }}
                >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '14px' }}>Primary Color</label>
                <input
                    type="color"
                    value={themeConfig.primaryColor}
                    onChange={(e) => setThemeConfig({ primaryColor: e.target.value })}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '32px', height: '32px' }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '14px' }}>Secondary Color</label>
                <input
                    type="color"
                    value={themeConfig.secondaryColor}
                    onChange={(e) => setThemeConfig({ secondaryColor: e.target.value })}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '32px', height: '32px' }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '14px' }}>Font Family</label>
                <select
                    value={themeConfig.fontFamily}
                    onChange={(e) => setThemeConfig({ fontFamily: e.target.value })}
                    style={{ background: '#1e293b', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '4px 8px', maxWidth: '120px' }}
                >
                    <option value="'Inter', sans-serif">Inter</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Fira Code', monospace">Fira Code</option>
                    <option value="'Playfair Display', serif">Playfair Display</option>
                </select>
            </div>
        </div>
    );
};
