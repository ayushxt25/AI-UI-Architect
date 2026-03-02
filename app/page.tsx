"use client";

import React, { useState } from 'react';
import { ChatPanel } from '@/components/ChatPanel';
import { CodePanel } from '@/components/CodePanel';
import { PreviewPanel } from '@/components/PreviewPanel';
import { VersionHistory } from '@/components/VersionHistory';
import { ThemeSettings } from '@/components/ThemeSettings';
import { AppStateProvider } from '@/lib/state/appState';

const INITIAL_CODE = `
() => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Navbar title="Welcome to AI UI Architect" />
      <div style={{ display: 'flex', gap: '20px' }}>
        <Sidebar>
          <Button label="Dashboard" variant="primary" onClick={() => alert('Dashboard Clicked')} />
          <Button label="Settings" variant="secondary" onClick={() => alert('Settings Clicked')} />
        </Sidebar>
        <Card title="Get Started">
          <p style={{ color: '#94a3b8', marginBottom: '16px' }}>
            Describe what you want to build in the chat panel to the left.
          </p>
          <Button label="Learn More" variant="primary" onClick={() => alert('Learning More...')} />
        </Card>
      </div>
    </div>
  );
}
`;

export default function Home() {
  const [version, setVersion] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [code, setCode] = useState(INITIAL_CODE);

  const handleNewVersion = (v: any) => {
    setVersion(v);
    setCode(v.code);
    setHistory(prev => {
      if (prev.find(item => item.id === v.id)) return prev;
      return [...prev, v];
    });
  };

  const handleRollback = async (id: number) => {
    try {
      const response = await fetch('/api/rollback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ versionId: id })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setVersion(data);
      setCode(data.code);
    } catch (err: any) {
      alert(`Rollback failed: ${err.message}`);
    }
  };

  return (
    <AppStateProvider>
      <main style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '400px', borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <ThemeSettings />
            <ChatPanel onNewVersion={handleNewVersion} currentVersionId={version?.id} />
          </div>
          <PreviewPanel code={code} />
        </div>
        <VersionHistory
          versions={history}
          onRollback={handleRollback}
          currentVersionId={version?.id}
        />
      </main>
    </AppStateProvider>
  );
}
