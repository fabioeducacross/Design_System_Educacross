import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

/**
 * # Tokens Showcase
 * 
 * Esta story exibe todos os tokens CSS do Design System para validação visual.
 * Use para detectar regressões e verificar se os tokens estão carregados corretamente.
 * 
 * ## Como validar no DevTools:
 * 1. Abra o DevTools (F12)
 * 2. Vá em Elements → Computed → Show all
 * 3. Verifique se as variáveis CSS em `:root` correspondem aos valores esperados
 * 4. Compare com os valores definidos em `packages/ui/src/styles.css`
 */

const meta: Meta = {
    title: "Foundations/Tokens Showcase",
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: "Exibe todos os tokens CSS do Design System para validação visual e detecção de regressões.",
            },
        },
    },
};

export default meta;
type Story = StoryObj;

// Helper para extrair valor de variável CSS
const getCSSVar = (varName: string): string => {
    if (typeof window === "undefined") return "";
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
};

// Componente para exibir uma cor
const ColorSwatch: React.FC<{ 
    name: string; 
    cssVar: string; 
    expectedHex?: string;
}> = ({ name, cssVar, expectedHex }) => {
    const [actualValue, setActualValue] = React.useState("");
    
    React.useEffect(() => {
        setActualValue(getCSSVar(cssVar));
    }, [cssVar]);
    
    const isMatch = expectedHex ? actualValue.toLowerCase() === expectedHex.toLowerCase() : true;
    
    return (
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
            <div 
                className="w-12 h-12 rounded-lg border border-gray-200 shadow-sm"
                style={{ backgroundColor: `var(${cssVar})` }}
            />
            <div className="flex-1 min-w-0">
                <div className="font-mono text-sm font-medium truncate">{cssVar}</div>
                <div className="text-xs text-gray-500">{name}</div>
            </div>
            <div className="text-right">
                <div className={`font-mono text-xs ${isMatch ? 'text-green-600' : 'text-red-600'}`}>
                    {actualValue || "—"}
                </div>
                {expectedHex && (
                    <div className="text-xs text-gray-400">
                        esperado: {expectedHex}
                    </div>
                )}
            </div>
            {expectedHex && (
                <div className={`w-3 h-3 rounded-full ${isMatch ? 'bg-green-500' : 'bg-red-500'}`} />
            )}
        </div>
    );
};

// Componente para seção de tokens
const TokenSection: React.FC<{ 
    title: string; 
    children: React.ReactNode;
}> = ({ title, children }) => (
    <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
            {title}
        </h3>
        <div className="space-y-1">
            {children}
        </div>
    </div>
);

// Story principal
export const AllTokens: Story = {
    render: () => (
        <div className="p-8 max-w-4xl mx-auto font-sans">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
                🎨 Tokens Showcase
            </h1>
            <p className="text-gray-600 mb-8">
                Validação visual dos tokens CSS do Design System.
                Cores com ✓ verde indicam match com valores esperados.
            </p>
            
            <TokenSection title="Primary (Roxo Educacross)">
                <ColorSwatch name="Primary 100" cssVar="--color-primary-100" expectedHex="#E0DEF9" />
                <ColorSwatch name="Primary 200" cssVar="--color-primary-200" expectedHex="#C1BDF4" />
                <ColorSwatch name="Primary 300" cssVar="--color-primary-300" expectedHex="#A29CEE" />
                <ColorSwatch name="Primary 400" cssVar="--color-primary-400" expectedHex="#8E88EB" />
                <ColorSwatch name="Primary 500" cssVar="--color-primary-500" expectedHex="#6E63E8" />
                <ColorSwatch name="Primary 600" cssVar="--color-primary-600" expectedHex="#635AD1" />
                <ColorSwatch name="Primary 700" cssVar="--color-primary-700" expectedHex="#5850BA" />
                <ColorSwatch name="Primary 800" cssVar="--color-primary-800" expectedHex="#4D47A3" />
                <ColorSwatch name="Primary 900" cssVar="--color-primary-900" expectedHex="#423D8C" />
            </TokenSection>
            
            <TokenSection title="Secondary (Cinza Neutro)">
                <ColorSwatch name="Secondary 100" cssVar="--color-secondary-100" expectedHex="#F0F1F2" />
                <ColorSwatch name="Secondary 200" cssVar="--color-secondary-200" expectedHex="#E1E2E5" />
                <ColorSwatch name="Secondary 300" cssVar="--color-secondary-300" expectedHex="#D2D4D8" />
                <ColorSwatch name="Secondary 400" cssVar="--color-secondary-400" expectedHex="#C3C5CA" />
                <ColorSwatch name="Secondary 500" cssVar="--color-secondary-500" expectedHex="#B4B7BD" />
            </TokenSection>
            
            <TokenSection title="Legend Colors (Sistema de Proficiência)">
                <ColorSwatch name="Avançado" cssVar="--color-legend-advanced" expectedHex="#6E63E8" />
                <ColorSwatch name="Proficiente" cssVar="--color-legend-proficient" expectedHex="#28C76F" />
                <ColorSwatch name="Básico (LARANJA!)" cssVar="--color-legend-basic" expectedHex="#FF9F43" />
                <ColorSwatch name="Abaixo do Básico" cssVar="--color-legend-below-basic" expectedHex="#EA5455" />
                <ColorSwatch name="Não Concluído" cssVar="--color-legend-not-completed" expectedHex="#B4B7BD" />
                <ColorSwatch name="Em Andamento" cssVar="--color-legend-in-progress" expectedHex="#00CFE8" />
            </TokenSection>
            
            <TokenSection title="Semantic Colors">
                <ColorSwatch name="Success 500" cssVar="--color-success-500" expectedHex="#28C76F" />
                <ColorSwatch name="Danger 500" cssVar="--color-danger-500" expectedHex="#EA5455" />
                <ColorSwatch name="Warning 500" cssVar="--color-warning-500" expectedHex="#FFD643" />
                <ColorSwatch name="Info 500" cssVar="--color-info-500" expectedHex="#00BAD1" />
            </TokenSection>
            
            <TokenSection title="Spacing (Padding)">
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((n) => (
                        <div key={n} className="flex items-center gap-2">
                            <div 
                                className="bg-primary-500 rounded"
                                style={{ 
                                    width: `var(--padding-${n})`, 
                                    height: `var(--padding-${n})` 
                                }}
                            />
                            <span className="font-mono text-sm">--padding-{n}</span>
                            <span className="text-xs text-gray-500">({n * 4}px)</span>
                        </div>
                    ))}
                </div>
            </TokenSection>
            
            <TokenSection title="Border Radius">
                <div className="flex flex-wrap gap-4">
                    {['xs', 'sm', 'md', 'lg', 'xl', 'round'].map((size) => (
                        <div key={size} className="text-center">
                            <div 
                                className="w-16 h-16 bg-primary-500 mb-2"
                                style={{ borderRadius: `var(--radius-${size})` }}
                            />
                            <span className="font-mono text-xs">--radius-{size}</span>
                        </div>
                    ))}
                </div>
            </TokenSection>
            
            <TokenSection title="Typography">
                <div className="space-y-2">
                    <div style={{ fontFamily: 'var(--font-sans)' }}>
                        <span className="font-mono text-sm text-gray-500">--font-sans: </span>
                        <span className="font-semibold">Montserrat, -apple-system...</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                        Verifique no DevTools se a fonte Montserrat está carregada corretamente.
                    </p>
                </div>
            </TokenSection>
        </div>
    ),
};

// Story para cores Legend (crítico para o sistema de proficiência)
export const LegendColors: Story = {
    name: "Legend Colors (Proficiência)",
    render: () => (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">⚠️ Sistema de Cores Legend</h2>
            <p className="text-gray-600 mb-6">
                Estas cores são usadas para indicar proficiência no Frontoffice.
                <strong className="text-orange-500"> legend-basic é LARANJA (#FF9F43), não amarelo!</strong>
            </p>
            
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg text-white text-center font-semibold bg-legend-advanced">
                    Avançado
                </div>
                <div className="p-4 rounded-lg text-white text-center font-semibold bg-legend-proficient">
                    Proficiente
                </div>
                <div className="p-4 rounded-lg text-white text-center font-semibold bg-legend-basic">
                    Básico (LARANJA!)
                </div>
                <div className="p-4 rounded-lg text-white text-center font-semibold bg-legend-below-basic">
                    Abaixo do Básico
                </div>
                <div className="p-4 rounded-lg text-white text-center font-semibold bg-legend-not-completed">
                    Não Concluído
                </div>
                <div className="p-4 rounded-lg text-white text-center font-semibold bg-legend-in-progress">
                    Em Andamento
                </div>
            </div>
        </div>
    ),
};

// Story para verificar fonte
export const Typography: Story = {
    render: () => (
        <div className="p-8 font-sans">
            <h1 className="text-4xl font-bold mb-4">Montserrat Bold (700)</h1>
            <h2 className="text-2xl font-semibold mb-4">Montserrat Semibold (600)</h2>
            <h3 className="text-xl font-medium mb-4">Montserrat Medium (500)</h3>
            <p className="text-base mb-4">Montserrat Regular (400) - Texto parágrafo normal</p>
            <p className="text-sm font-light">Montserrat Light (300) - Texto secundário</p>
            
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <p className="font-mono text-sm">
                    Verifique no DevTools → Network → Fonts se "Montserrat" está carregando de fonts.googleapis.com
                </p>
            </div>
        </div>
    ),
};

// Story para debug
export const DebugRootVars: Story = {
    name: "Debug :root Variables",
    render: () => {
        const [vars, setVars] = React.useState<Record<string, string>>({});
        
        React.useEffect(() => {
            const root = document.documentElement;
            const style = getComputedStyle(root);
            const cssVars: Record<string, string> = {};
            
            // Lista de variáveis para verificar
            const varsToCheck = [
                '--color-primary-500',
                '--color-secondary-500',
                '--color-success-500',
                '--color-danger-500',
                '--color-warning-500',
                '--color-info-500',
                '--color-legend-basic',
                '--color-legend-advanced',
                '--font-sans',
                '--padding-4',
                '--radius-md',
            ];
            
            varsToCheck.forEach((v) => {
                cssVars[v] = style.getPropertyValue(v).trim() || '❌ NOT FOUND';
            });
            
            setVars(cssVars);
        }, []);
        
        return (
            <div className="p-8 font-mono text-sm">
                <h2 className="text-xl font-bold mb-4 font-sans">Debug: Variáveis CSS em :root</h2>
                <p className="text-gray-600 mb-6 font-sans">
                    Se alguma variável mostrar "❌ NOT FOUND", o CSS do DS não está carregando corretamente.
                </p>
                
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-2">Variável</th>
                            <th className="text-left p-2">Valor</th>
                            <th className="text-left p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(vars).map(([key, value]) => (
                            <tr key={key} className="border-b">
                                <td className="p-2">{key}</td>
                                <td className="p-2">{value}</td>
                                <td className="p-2">
                                    {value.includes('NOT FOUND') ? (
                                        <span className="text-red-500">❌ Erro</span>
                                    ) : (
                                        <span className="text-green-500">✅ OK</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    },
};
