"use client";

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodePanelProps {
    code: string;
    onChange?: (value: string | undefined) => void;
}

export const CodePanel: React.FC<CodePanelProps> = ({ code, onChange }) => {
    return (
        <div style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            background: '#1e293b'
        }}>
            <div style={{
                padding: '12px 20px',
                background: 'rgba(0, 0, 0, 0.2)',
                color: '#94a3b8',
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}>
                Source Code
            </div>
            <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    padding: { top: 20 },
                    scrollBeyondLastLine: false,
                    readOnly: false,
                }}
            />
        </div>
    );
};
