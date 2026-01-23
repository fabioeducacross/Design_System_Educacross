import React, { useState } from 'react';
import { useStorybookApi, useParameter } from 'storybook/internal/manager-api';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { MultiFrameworkCode } from './types';

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = ({ active }) => {
  const api = useStorybookApi();
  const [activeTab, setActiveTab] = useState<'react' | 'vue2' | 'vue3'>('react');
  
  // Pegar parâmetros da story atual
  const storyId = api.getUrlState().storyId;
  const story = storyId ? api.getData(storyId) : null;
  const codeExamples = story?.parameters?.multiFrameworkCode as MultiFrameworkCode | undefined;
  
  if (!active) {
    return null;
  }

  if (!codeExamples) {
    return (
      <div style={{ padding: '20px', color: '#666' }}>
        <p>Nenhum código multi-framework disponível para esta story.</p>
        <p style={{ fontSize: '12px', marginTop: '10px' }}>
          Adicione o parâmetro <code>multiFrameworkCode</code> na story.
        </p>
      </div>
    );
  }

  const tabs = [
    { id: 'react' as const, label: 'React', code: codeExamples.react, language: 'tsx' },
    { id: 'vue2' as const, label: 'Vue 2 + Bootstrap', code: codeExamples.vue2, language: 'vue' },
    { id: 'vue3' as const, label: 'Vue 3', code: codeExamples.vue3, language: 'vue' },
  ];

  const handleCopy = () => {
    const activeCode = tabs.find((t) => t.id === activeTab)?.code || '';
    navigator.clipboard.writeText(activeCode);
  };

  return (
    <div style={{ padding: '10px', background: '#1e1e1e', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '10px',
          borderBottom: '1px solid #3e3e3e',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              border: 'none',
              background: activeTab === tab.id ? '#1ea7fd' : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#aaa',
              cursor: 'pointer',
              borderRadius: '4px 4px 0 0',
              fontWeight: activeTab === tab.id ? '600' : '400',
              fontSize: '13px',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
        <button
          onClick={handleCopy}
          style={{
            marginLeft: 'auto',
            padding: '8px 16px',
            border: '1px solid #3e3e3e',
            background: '#2e2e2e',
            color: '#fff',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          📋 Copy
        </button>
      </div>
      <SyntaxHighlighter
        language={tabs.find((t) => t.id === activeTab)?.language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: '4px',
          fontSize: '13px',
          maxHeight: 'calc(100vh - 200px)',
          overflow: 'auto',
        }}
      >
        {tabs.find((t) => t.id === activeTab)?.code || ''}
      </SyntaxHighlighter>
    </div>
  );
};
