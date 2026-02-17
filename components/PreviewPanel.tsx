"use client";

import React from 'react';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import * as UI from './ui';
import { AppStateProvider, useAppState, useDataFetch } from '@/lib/state/appState';
import { MOCK_DATA } from '@/lib/mock/dataGenerator';
import { ErrorBoundary } from './ErrorBoundary';

interface PreviewPanelProps {
    code: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ code }) => {
    return (
        <div style={{
            flex: 1.2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#0f172a',
            overflow: 'hidden'
        }}>
            <div style={{
                padding: '12px 20px',
                background: 'rgba(0, 0, 0, 0.2)',
                color: '#a855f7',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                Live Preview
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: '20px', position: 'relative' }}>
                <AppStateProvider>
                    <LiveProvider code={code} scope={{ ...UI, useAppState, useDataFetch, MOCK_DATA, React, useEffect: React.useEffect, useState: React.useState }} noInline={false}>
                        <div style={{
                            minHeight: '100%',
                            background: '#1e293b',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '24px',
                            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
                        }}>
                            <ErrorBoundary>
                                <LivePreview />
                            </ErrorBoundary>
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            right: '20px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '8px',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            pointerEvents: 'none'
                        }}>
                            <LiveError style={{ color: '#f87171', fontSize: '12px', margin: 0, padding: '12px' }} />
                        </div>
                    </LiveProvider>
                </AppStateProvider>
            </div>
        </div>
    );
};
