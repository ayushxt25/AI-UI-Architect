"use client";

import React, { useState } from 'react';
import { Button, Input } from './ui';
import { DiffViewer } from './DiffViewer';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatPanelProps {
    onNewVersion: (version: any) => void;
    currentVersionId?: number;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ onNewVersion, currentVersionId }) => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello! I'm your AI UI Architect. What would you like to build today?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);
        setInput('');

        try {
            const isFreshIntent = input.toLowerCase().includes('build') ||
                input.toLowerCase().includes('create') ||
                input.toLowerCase().includes('design') ||
                input.toLowerCase().includes('clone');

            const actualVersionId = isFreshIntent ? undefined : currentVersionId;
            const endpoint = actualVersionId ? '/api/modify' : '/api/generate';
            const body = actualVersionId
                ? { intent: userMessage.content, versionId: actualVersionId }
                : { intent: userMessage.content };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `${data.explanation}\n\n**Reasoning:** ${data.plan.reasoning}\n\n*${data.plan.constraint_notice || ''}*`
            }]);
            onNewVersion(data);
        } catch (err: any) {
            setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            width: '400px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            background: '#0f172a'
        }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.map((m, i) => (
                    <div key={i} style={{
                        alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        background: m.role === 'user' ? '#4f46e5' : 'rgba(255, 255, 255, 0.05)',
                        color: 'white',
                        border: m.role === 'assistant' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                    }}>
                        {m.content}
                    </div>
                ))}
            </div>

            <div style={{ padding: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', gap: '8px' }}>
                <Input
                    placeholder="Describe your UI..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button label="Send" onClick={handleSend} />
            </div>
        </div>
    );
};
