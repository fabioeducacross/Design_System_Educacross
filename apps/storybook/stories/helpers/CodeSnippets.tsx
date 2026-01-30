import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export interface FrameworkSnippet {
  /** Nome do framework/linguagem */
  label: string;
  /** Linguagem para syntax highlighting */
  language: "html" | "vue" | "jsx" | "tsx" | "css" | "scss";
  /** Código a ser exibido */
  code: string;
}

export interface CodeSnippetsProps {
  /** Lista de snippets para cada framework */
  snippets: FrameworkSnippet[];
  /** Título opcional */
  title?: string;
}

/**
 * Componente que exibe snippets de código para múltiplos frameworks
 * em abas separadas (Vue 2, React, HTML, etc.)
 */
export function CodeSnippets({ snippets, title }: CodeSnippetsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!snippets || snippets.length === 0) {
    return null;
  }

  return (
    <div className="code-snippets-container mt-6 rounded-lg border border-gray-200 overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
        </div>
      )}
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        {snippets.map((snippet, index) => (
          <button
            key={snippet.label}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === index
                ? "bg-white text-primary border-b-2 border-primary -mb-px"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {snippet.label}
          </button>
        ))}
      </div>

      {/* Código */}
      <div className="relative">
        <SyntaxHighlighter
          language={snippets[activeTab].language === "vue" ? "markup" : snippets[activeTab].language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            fontSize: "13px",
            lineHeight: "1.5",
          }}
          showLineNumbers
        >
          {snippets[activeTab].code.trim()}
        </SyntaxHighlighter>
        
        {/* Botão de copiar */}
        <button
          onClick={() => navigator.clipboard.writeText(snippets[activeTab].code.trim())}
          className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          title="Copiar código"
        >
          📋 Copiar
        </button>
      </div>
    </div>
  );
}

/**
 * Helpers para criar snippets comuns
 */
export const createVue2Snippet = (code: string): FrameworkSnippet => ({
  label: "Vue 2 + Bootstrap-Vue",
  language: "vue",
  code,
});

export const createReactSnippet = (code: string): FrameworkSnippet => ({
  label: "React",
  language: "jsx",
  code,
});

export const createHtmlSnippet = (code: string): FrameworkSnippet => ({
  label: "HTML",
  language: "html",
  code,
});

export const createScssSnippet = (code: string): FrameworkSnippet => ({
  label: "SCSS",
  language: "scss",
  code,
});

export default CodeSnippets;
