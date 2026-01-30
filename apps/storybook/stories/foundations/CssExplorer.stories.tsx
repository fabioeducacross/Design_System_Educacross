import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState, useEffect, useMemo } from "react";
import { cssManifest, type ClassCategory, type ClassItem } from "./css-manifest";

const meta: Meta = {
  title: "Foundations/CSS Explorer",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# CSS Explorer

Ferramenta interativa para explorar tokens CSS e classes do Design System.

## Token Explorer

Lista todas as variáveis CSS (\`--*\`) disponíveis no documento, organizadas por prefixo:
- \`--color-*\`: Cores
- \`--font-*\`: Tipografia
- \`--radius-*\`: Raios de borda
- \`--spacing-*\`, \`--padding-*\`, \`--gap-*\`: Espaçamentos
- \`--shadow-*\`: Sombras
- \`--z-*\`: Z-index

**Clique em qualquer token** para copiar seu nome para a área de transferência.

## Class Playground

Explore classes Tailwind CSS curadas do Design System:
1. Selecione uma categoria
2. Selecione uma classe
3. Veja o preview aplicado em um card
4. Copie o snippet de código

## Validação

Este explorador usa \`getComputedStyle(document.documentElement)\` para ler tokens diretamente do DOM,
garantindo que os valores exibidos correspondem exatamente ao CSS carregado.

**Exemplo de validação**: \`--color-primary-500\` deve ser \`#6e63e8\` (roxo Educacross).
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// TOKEN EXPLORER
// ========================================

interface CssVariable {
  name: string;
  value: string;
  computedValue?: string;
}

function TokenExplorer() {
  const [cssVariables, setCssVariables] = useState<CssVariable[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Ler todas as variáveis CSS do :root de forma mais eficiente
    const loadVariables = () => {
      try {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        const variables: CssVariable[] = [];
        
        // Limitar a busca apenas às propriedades que começam com --
        // Usar um Set para evitar duplicatas
        const seen = new Set<string>();

        // Iterar sobre todas as propriedades
        const length = Math.min(computedStyle.length, 1000); // Limitar a 1000 propriedades
        for (let i = 0; i < length; i++) {
          const propName = computedStyle[i];
          if (propName.startsWith("--") && !seen.has(propName)) {
            seen.add(propName);
            const value = computedStyle.getPropertyValue(propName).trim();
            if (value) {
              variables.push({
                name: propName,
                value: value,
              });
            }
          }
        }

        // Ordenar alfabeticamente
        variables.sort((a, b) => a.name.localeCompare(b.name));
        setCssVariables(variables);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar variáveis CSS:", error);
        setCssVariables([]);
        setLoading(false);
      }
    };

    // Executar após um pequeno delay para não bloquear a renderização
    const timer = setTimeout(loadVariables, 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredVariables = useMemo(() => {
    let filtered = cssVariables;

    // Aplicar filtro por prefixo
    if (filter !== "all") {
      filtered = filtered.filter((v) => v.name.startsWith(`--${filter}`));
    }

    // Aplicar busca
    if (searchTerm) {
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [cssVariables, filter, searchTerm]);

  const copyToClipboard = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const prefixCategories = [
    { id: "all", name: "Todos", icon: "🎨" },
    { id: "color", name: "Cores", icon: "🎨" },
    { id: "font", name: "Fontes", icon: "✍️" },
    { id: "radius", name: "Raios", icon: "⭕" },
    { id: "padding", name: "Padding", icon: "📦" },
    { id: "gap", name: "Gap", icon: "↔️" },
    { id: "shadow", name: "Sombras", icon: "🌑" },
    { id: "z", name: "Z-Index", icon: "📐" },
  ];

  const getTokenPreview = (variable: CssVariable) => {
    const name = variable.name;
    const value = variable.value;

    // Cores
    if (name.includes("color") || name.includes("legend")) {
      // Verificar se é HSL (formato Tailwind)
      if (value.includes(" ") && !value.includes("rgb") && !value.includes("#")) {
        return (
          <div
            className="w-12 h-12 rounded border border-border"
            style={{ backgroundColor: `hsl(${value})` }}
          />
        );
      }
      // RGB triplets (para usar com Tailwind opacity)
      if (value.match(/^\d+\s+\d+\s+\d+$/)) {
        return (
          <div
            className="w-12 h-12 rounded border border-border"
            style={{ backgroundColor: `rgb(${value})` }}
          />
        );
      }
      // Hex ou rgba
      return (
        <div
          className="w-12 h-12 rounded border border-border"
          style={{ backgroundColor: value }}
        />
      );
    }

    // Raios de borda
    if (name.includes("radius")) {
      return (
        <div
          className="w-12 h-12 bg-primary"
          style={{ borderRadius: value }}
        />
      );
    }

    // Espaçamentos (padding, gap, spacing)
    if (name.includes("padding") || name.includes("gap") || name.includes("spacing")) {
      return (
        <div className="flex items-center justify-center">
          <div className="bg-primary" style={{ width: value, height: value }} />
        </div>
      );
    }

    // Fontes
    if (name.includes("font")) {
      return (
        <span style={{ fontFamily: value }} className="text-2xl font-semibold">
          Aa
        </span>
      );
    }

    // Padrão: apenas texto
    return <span className="text-xs text-muted-foreground font-mono">{value}</span>;
  };

  return (
    <div className="p-8 bg-background">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-foreground">Token Explorer</h2>
        <p className="text-muted-foreground">
          Explore todas as variáveis CSS do Design System. Clique para copiar.
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {prefixCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all
                ${
                  filter === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }
              `}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Buscar token ou valor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
        />
      </div>

      {/* Contagem */}
      <div className="mb-4 text-sm text-muted-foreground">
        Exibindo {filteredVariables.length} de {cssVariables.length} tokens
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Carregando tokens CSS...</p>
        </div>
      )}

      {/* Lista de Tokens */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVariables.map((variable) => (
          <button
            key={variable.name}
            onClick={() => copyToClipboard(variable.name)}
            className="relative flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent transition-all text-left"
          >
            {/* Preview */}
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
              {getTokenPreview(variable)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="font-mono text-sm font-semibold text-primary truncate">
                {variable.name}
              </div>
              <div className="font-mono text-xs text-muted-foreground truncate">
                {variable.value}
              </div>
            </div>

            {/* Feedback de cópia */}
            {copiedToken === variable.name && (
              <div className="absolute top-2 right-2 bg-success text-white px-2 py-1 rounded text-xs font-medium">
                ✓ Copiado!
              </div>
            )}
          </button>
        ))}
      </div>
      )}

      {!loading && filteredVariables.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Nenhum token encontrado com os filtros aplicados.
        </div>
      )}
    </div>
  );
}

// ========================================
// CLASS PLAYGROUND
// ========================================

function ClassPlayground() {
  const [selectedCategory, setSelectedCategory] = useState<ClassCategory>(cssManifest[0]);
  const [selectedClass, setSelectedClass] = useState<ClassItem>(cssManifest[0].classes[0]);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  useEffect(() => {
    // Atualizar classe selecionada quando categoria muda
    setSelectedClass(selectedCategory.classes[0]);
  }, [selectedCategory]);

  const copySnippet = () => {
    const snippet = `<div className="${selectedClass.className}">\n  Conteúdo\n</div>`;
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="p-8 bg-background">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-foreground">Class Playground</h2>
        <p className="text-muted-foreground">
          Explore classes Tailwind CSS do Design System com preview interativo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seletores */}
        <div className="space-y-4">
          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Categoria
            </label>
            <select
              value={selectedCategory.id}
              onChange={(e) => {
                const cat = cssManifest.find((c) => c.id === e.target.value);
                if (cat) setSelectedCategory(cat);
              }}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background"
            >
              {cssManifest.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-muted-foreground">
              {selectedCategory.description}
            </p>
          </div>

          {/* Classe */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Classe
            </label>
            <select
              value={selectedClass.name}
              onChange={(e) => {
                const cls = selectedCategory.classes.find(
                  (c) => c.name === e.target.value
                );
                if (cls) setSelectedClass(cls);
              }}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background"
            >
              {selectedCategory.classes.map((cls) => (
                <option key={cls.name} value={cls.name}>
                  {cls.name}
                </option>
              ))}
            </select>
            {selectedClass.description && (
              <p className="mt-1 text-xs text-muted-foreground">
                {selectedClass.description}
              </p>
            )}
          </div>

          {/* Snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-foreground">
                Código
              </label>
              <button
                onClick={copySnippet}
                className="text-xs text-primary hover:text-primary/80 font-medium"
              >
                {copiedSnippet ? "✓ Copiado!" : "Copiar"}
              </button>
            </div>
            <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
              <code>{`<div className="${selectedClass.className}">\n  Conteúdo\n</div>`}</code>
            </pre>
          </div>

          {/* Classes disponíveis */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Classes disponíveis ({selectedCategory.classes.length})
            </label>
            <div className="space-y-1 max-h-60 overflow-y-auto border border-border rounded-lg p-2">
              {selectedCategory.classes.map((cls) => (
                <button
                  key={cls.name}
                  onClick={() => setSelectedClass(cls)}
                  className={`
                    w-full text-left px-3 py-2 rounded text-sm transition-all
                    ${
                      selectedClass.name === cls.name
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-accent"
                    }
                  `}
                >
                  {cls.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">
            Preview
          </label>

          <div className="space-y-4">
            {/* Card Preview */}
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className={`${selectedClass.className} p-6 rounded-lg transition-all`}>
                <h3 className="text-lg font-semibold mb-2">Card de Exemplo</h3>
                <p className="mb-4">
                  Este é um preview da classe <code className="font-mono text-sm">{selectedClass.className}</code> aplicada.
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded bg-primary text-primary-foreground text-sm">
                    Botão Primário
                  </button>
                  <button className="px-4 py-2 rounded bg-secondary text-secondary-foreground text-sm">
                    Botão Secundário
                  </button>
                </div>
              </div>
            </div>

            {/* Text Preview */}
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className={selectedClass.className}>
                <h4 className="font-semibold mb-2">Título com a classe aplicada</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            {/* Small Elements Preview */}
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className="space-y-3">
                <div className={`${selectedClass.className} inline-block px-4 py-2 rounded`}>
                  Badge/Tag
                </div>
                <div className={`${selectedClass.className} w-full p-4 rounded`}>
                  Bloco de Conteúdo
                </div>
                <div className="flex gap-2">
                  <div className={`${selectedClass.className} flex-1 p-3 rounded text-center`}>
                    Item 1
                  </div>
                  <div className={`${selectedClass.className} flex-1 p-3 rounded text-center`}>
                    Item 2
                  </div>
                  <div className={`${selectedClass.className} flex-1 p-3 rounded text-center`}>
                    Item 3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// STORIES
// ========================================

export const TokenExplorerStory: Story = {
  name: "Token Explorer",
  render: () => <TokenExplorer />,
};

export const ClassPlaygroundStory: Story = {
  name: "Class Playground",
  render: () => <ClassPlayground />,
};

export const Combined: Story = {
  name: "CSS Explorer Completo",
  render: () => (
    <div>
      <TokenExplorer />
      <div className="border-t border-border my-8" />
      <ClassPlayground />
    </div>
  ),
};
