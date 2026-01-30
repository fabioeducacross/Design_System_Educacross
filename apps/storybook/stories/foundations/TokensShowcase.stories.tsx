import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

/**
 * # Tokens Showcase - Modo Pixel Perfect
 * 
 * Esta story exibe os tokens CSS do Design System carregados no Storybook.
 * Serve como ferramenta de regressão visual para garantir que os tokens
 * estão sendo importados corretamente do pacote compilado.
 * 
 * **Objetivo**: Validar que as variáveis CSS do Design System estão
 * presentes e com os valores corretos após as mudanças de pixel perfect.
 */

interface Token {
  name: string;
  value: string;
}

interface TokenGroup {
  category: string;
  tokens: Token[];
}

const TokensShowcase = () => {
  const [tokenGroups, setTokenGroups] = useState<TokenGroup[]>([]);

  useEffect(() => {
    // Obtém as variáveis CSS do :root
    const rootStyles = getComputedStyle(document.documentElement);
    
    // Categorias de tokens para exibir
    const categories = [
      { prefix: "--color-primary-", category: "Primary Colors" },
      { prefix: "--color-secondary-", category: "Secondary Colors" },
      { prefix: "--color-success-", category: "Success Colors" },
      { prefix: "--color-danger-", category: "Danger Colors" },
      { prefix: "--color-warning-", category: "Warning Colors" },
      { prefix: "--color-info-", category: "Info Colors" },
      { prefix: "--color-legend-", category: "Legend Colors (Proficiência)" },
      { prefix: "--padding-", category: "Padding Tokens" },
      { prefix: "--gap-", category: "Gap Tokens" },
      { prefix: "--radius-", category: "Border Radius" },
    ];

    const groups: TokenGroup[] = [];

    categories.forEach(({ prefix, category }) => {
      const tokens: Token[] = [];
      
      // Itera sobre todas as propriedades CSS do :root
      for (let i = 0; i < document.styleSheets.length; i++) {
        try {
          const sheet = document.styleSheets[i];
          if (!sheet.cssRules) continue;

          for (let j = 0; j < sheet.cssRules.length; j++) {
            const rule = sheet.cssRules[j];
            
            if (rule instanceof CSSStyleRule && rule.selectorText === ":root") {
              const style = rule.style;
              
              for (let k = 0; k < style.length; k++) {
                const propName = style[k];
                
                if (propName.startsWith(prefix)) {
                  const value = rootStyles.getPropertyValue(propName).trim();
                  if (value) {
                    tokens.push({ name: propName, value });
                  }
                }
              }
            }
          }
        } catch (e) {
          // Ignora erros de CORS em stylesheets externos
          continue;
        }
      }

      if (tokens.length > 0) {
        // Remove duplicatas
        const uniqueTokens = tokens.reduce((acc, token) => {
          if (!acc.find(t => t.name === token.name)) {
            acc.push(token);
          }
          return acc;
        }, [] as Token[]);

        // Ordena por nome
        uniqueTokens.sort((a, b) => a.name.localeCompare(b.name));

        groups.push({
          category,
          tokens: uniqueTokens,
        });
      }
    });

    setTokenGroups(groups);
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Tokens Showcase</h1>
        <p className="text-gray-600 mb-8">
          Visualização dos tokens CSS do Design System carregados no Storybook.
          Estes valores são lidos diretamente do :root usando getComputedStyle.
        </p>
      </div>

      {tokenGroups.length === 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            ⚠️ Nenhum token encontrado. Verifique se o CSS do Design System está sendo carregado corretamente.
          </p>
        </div>
      )}

      {tokenGroups.map((group) => (
        <div key={group.category} className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
            {group.category}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.tokens.map((token) => (
              <div
                key={token.name}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono text-purple-600">
                    {token.name}
                  </code>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Preview visual para cores */}
                  {token.name.includes("color") && (
                    <div
                      className="w-10 h-10 rounded border border-gray-300"
                      style={{
                        backgroundColor: token.value.startsWith("hsl")
                          ? `hsl(${token.value})`
                          : token.value,
                      }}
                      title={token.value}
                    />
                  )}
                  
                  {/* Preview visual para spacing */}
                  {(token.name.includes("padding") || 
                    token.name.includes("gap") ||
                    token.name.includes("radius")) && (
                    <div
                      className="bg-blue-100 border border-blue-300"
                      style={{
                        width: token.name.includes("radius") ? "40px" : token.value,
                        height: token.name.includes("radius") ? "40px" : "20px",
                        borderRadius: token.name.includes("radius") ? token.value : "0",
                      }}
                      title={token.value}
                    />
                  )}
                  
                  <span className="text-sm text-gray-600 font-mono">
                    {token.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Informações de Debug</h3>
        <p className="text-sm text-gray-600">
          Total de grupos: {tokenGroups.length}
        </p>
        <p className="text-sm text-gray-600">
          Total de tokens: {tokenGroups.reduce((acc, g) => acc + g.tokens.length, 0)}
        </p>
      </div>
    </div>
  );
};

const meta: Meta<typeof TokensShowcase> = {
  title: "Foundations/Tokens Showcase",
  component: TokensShowcase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Esta story exibe todos os tokens CSS do Design System que foram carregados no Storybook.
É uma ferramenta de regressão visual para garantir que o modo Pixel Perfect está funcionando
corretamente e que todos os tokens estão disponíveis.

### Como usar

1. Verifique se todos os tokens esperados estão sendo exibidos
2. Confirme que os valores estão corretos
3. Use como referência ao desenvolver novos componentes

### Tokens Esperados

- **Primary Colors**: Escala de roxo do Educacross
- **Legend Colors**: Cores de proficiência (advanced, proficient, basic, etc.)
- **Spacing**: Padding, gap, margin
- **Border Radius**: Diferentes tamanhos de arredondamento
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TokensShowcase>;

export const Default: Story = {
  render: () => <TokensShowcase />,
};
