'use client';
import React, { useState } from 'react';
import { AppRenderer } from '../dynamic/Registry';
import { CodeViewer } from './CodeViewer';
import { Monitor, Code as CodeIcon, RotateCcw } from 'lucide-react';

export const Preview = ({ schema, onReset }) => {
    const [mode, setMode] = useState('preview'); // 'preview' | 'code'

    return (
        <div style={{ flex: 1, background: 'var(--bg-app)', borderLeft: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column' }}>
            {/* Toolbar */}
            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', background: 'var(--bg-app)', padding: '2px', borderRadius: '8px' }}>
                    <button
                        onClick={() => setMode('preview')}
                        style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: mode === 'preview' ? 'white' : 'transparent', boxShadow: mode === 'preview' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', display: 'flex', gap: '6px', fontSize: '0.85rem', color: mode === 'preview' ? 'black' : '#666' }}
                    >
                        <Monitor size={14} /> Preview
                    </button>
                    <button
                        onClick={() => setMode('code')}
                        style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: mode === 'code' ? 'white' : 'transparent', boxShadow: mode === 'code' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', display: 'flex', gap: '6px', fontSize: '0.85rem', color: mode === 'code' ? 'black' : '#666' }}
                    >
                        <CodeIcon size={14} /> Code
                    </button>
                </div>

                <button onClick={onReset} title="Reset App" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#666' }}>
                    <RotateCcw size={16} />
                </button>
            </div>

            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {mode === 'preview' ? (
                    <div className="glass-panel" style={{ margin: '24px', flex: 1, overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border-strong)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', background: 'white' }}>
                        <div style={{ overflowY: 'auto', height: '100%', padding: '24px' }}>
                            <AppRenderer schema={schema} />
                        </div>
                    </div>
                ) : (
                    <CodeViewer schema={schema} />
                )}
            </div>
        </div>
    );
};
